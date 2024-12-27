import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";

import { kysely } from "@court-base/db";
import { OrgDesignationSchema, OrgRoleSchema } from "@court-base/db/models";

import {
  orgPrivilegedProcedure,
  protectedProcedure,
  publicProcedure,
} from "../trpc";

const INVITE_CODE_LENGTH = 10;

const CreateInviteInput = z.object({
  role: OrgRoleSchema.default("MEMBER"),
  designation: OrgDesignationSchema.default("ADVOCATE"),
  maxUses: z.number().optional(),
  expiresAt: z.date().optional(),
});

export const organizationInviteRouter = {
  create: orgPrivilegedProcedure
    .input(CreateInviteInput)
    .mutation(async ({ ctx, input }) => {
      const { memberId } = ctx;
      const code = nanoid(INVITE_CODE_LENGTH);
      const invite = await ctx.kysely
        .insertInto("OrganizationInvite")
        .values({
          organizationId: ctx.orgId,
          code,
          createdByOrgId: ctx.orgId,
          createdByMemberId: memberId,
          role: input.role,
          designation: input.designation,
          maxUses: input.maxUses,
          expiresAt: input.expiresAt,
        })
        .returning(["id", "code", "role", "maxUses", "expiresAt"])
        .executeTakeFirstOrThrow();

      return invite;
    }),

  list: orgPrivilegedProcedure.query(async ({ ctx }) => {
    return ctx.kysely
      .selectFrom("OrganizationInvite")
      .leftJoin("OrganizationMembers", (join) =>
        join
          .onRef(
            "OrganizationInvite.createdByOrgId",
            "=",
            "OrganizationMembers.organizationId",
          )
          .onRef(
            "OrganizationInvite.createdByMemberId",
            "=",
            "OrganizationMembers.memberId",
          ),
      )
      .leftJoin("User", "OrganizationMembers.userId", "User.id")
      .select([
        "OrganizationInvite.id",
        "OrganizationInvite.code",
        "OrganizationInvite.role",
        "OrganizationInvite.designation",
        "OrganizationInvite.maxUses",
        "OrganizationInvite.usedCount",
        "OrganizationInvite.expiresAt",
        "OrganizationInvite.createdAt",
        "User.name as createdByName",
        "OrganizationMembers.memberId as createdByMemberId",
      ])
      .where("OrganizationInvite.organizationId", "=", ctx.orgId)
      .execute();
  }),

  getByCode: publicProcedure
    .input(z.object({ code: z.string() }))
    .query(async ({ ctx, input }) => {
      const invite = await ctx.kysely
        .selectFrom("OrganizationInvite")
        .leftJoin(
          "Organization",
          "OrganizationInvite.organizationId",
          "Organization.id",
        )
        .select([
          "OrganizationInvite.id",
          "OrganizationInvite.role",
          "OrganizationInvite.designation",
          "OrganizationInvite.maxUses",
          "OrganizationInvite.usedCount",
          "OrganizationInvite.expiresAt",
          "Organization.id as organizationId",
          "Organization.name as organizationName",
        ])
        .where("OrganizationInvite.code", "=", input.code)
        .executeTakeFirst();

      if (!invite) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invite not found",
        });
      }

      if (invite.expiresAt && invite.expiresAt < new Date()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invite has expired",
        });
      }

      if (invite.maxUses && invite.usedCount >= invite.maxUses) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invite has reached maximum uses",
        });
      }

      return invite;
    }),

  accept: protectedProcedure
    .input(z.object({ code: z.string(), name: z.string().min(1).max(255) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.kysely.transaction().execute(async (trx) => {
        // Get invite and check if it's valid
        const invite = await trx
          .selectFrom("OrganizationInvite")
          .select([
            "id",
            "organizationId",
            "role",
            "designation",
            "maxUses",
            "usedCount",
            "expiresAt",
          ])
          .where("code", "=", input.code)
          .forUpdate() // Lock the row for update
          .executeTakeFirst();

        if (!invite) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Invite not found",
          });
        }

        if (invite.expiresAt && invite.expiresAt < new Date()) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invite has expired",
          });
        }

        if (invite.maxUses && invite.usedCount >= invite.maxUses) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invite has reached maximum uses",
          });
        }

        // Check if user is already a member
        const existingMember = await trx
          .selectFrom("OrganizationMembers")
          .select("memberId")
          .where("organizationId", "=", invite.organizationId)
          .where("userId", "=", ctx.session.user.id)
          .executeTakeFirst();

        if (existingMember) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "You are already a member of this organization",
          });
        }

        // Update user's name if not set
        if (!ctx.session.user.name) {
          await trx
            .updateTable("User")
            .set({ name: input.name })
            .where("id", "=", ctx.session.user.id)
            .execute();
        }

        const memberId = await generateUniqueSlug(
          invite.organizationId,
          input.name,
        );

        // Add user to organization
        await trx
          .insertInto("OrganizationMembers")
          .values({
            organizationId: invite.organizationId,
            userId: ctx.session.user.id,
            memberId,
            name: input.name,
            role: invite.role,
            designation: invite.designation,
          })
          .execute();

        // Increment used count
        await trx
          .updateTable("OrganizationInvite")
          .set({ usedCount: invite.usedCount + 1 })
          .where("id", "=", invite.id)
          .execute();

        return { success: true };
      });
    }),

  revoke: orgPrivilegedProcedure
    .input(z.object({ inviteId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.kysely
        .deleteFrom("OrganizationInvite")
        .where("id", "=", input.inviteId)
        .where("organizationId", "=", ctx.orgId)
        .execute();

      return { success: true };
    }),
} satisfies TRPCRouterRecord;

async function generateUniqueSlug(
  organizationId: string,
  name: string,
): Promise<string> {
  const baseSlug = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await kysely
      .selectFrom("OrganizationMembers")
      .select("memberId")
      .where("organizationId", "=", organizationId)
      .where("memberId", "=", slug)
      .executeTakeFirst();

    if (!existing) {
      return slug;
    }

    slug = `${baseSlug}${counter}`;
    counter++;
  }
}
