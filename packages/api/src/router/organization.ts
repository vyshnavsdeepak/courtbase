import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { MemberRole, OrganizationCreateModel } from "../models";
import {
  orgProtectedProcedure,
  protectedProcedure,
  publicProcedure,
} from "../trpc";
import { generateMemberId } from "../utils/user-utils";

const UpdateUserNameInput = z.object({
  name: z.string().min(1).max(255),
});

export const organizationRouter = {
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.kysely
        .selectFrom("Organization")
        .selectAll()
        .where("id", "=", input.id)
        .execute();
    }),

  getAllByUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.kysely
      .selectFrom("Organization")
      .leftJoin(
        "OrganizationMembers",
        "Organization.id",
        "OrganizationMembers.organizationId",
      )
      .select(["Organization.id", "Organization.name"])
      .where("OrganizationMembers.userId", "=", ctx.session.user.id)
      .execute();
  }),

  create: protectedProcedure
    .input(OrganizationCreateModel)
    .mutation(async ({ ctx, input }) => {
      const org = await ctx.kysely
        .insertInto("Organization")
        .values({
          id: input.id,
          name: input.name,
        })
        .returning(["id", "name"])
        .executeTakeFirstOrThrow();

      // Update user's name if not set
      if (!ctx.session.user.name) {
        await ctx.kysely
          .updateTable("User")
          .set({ name: input.memberName })
          .where("id", "=", ctx.session.user.id)
          .execute();
      }

      const memberId = generateMemberId(input.memberName);
      await ctx.kysely
        .insertInto("OrganizationMembers")
        .values({
          organizationId: org.id,
          userId: ctx.session.user.id,
          memberId,
          name: input.memberName,
          role: MemberRole.enum.OWNER,
        })
        .executeTakeFirstOrThrow();

      return org;
    }),

  getAdvocates: orgProtectedProcedure.query(async ({ ctx }) => {
    return ctx.kysely
      .selectFrom("OrganizationMembers")
      .where("OrganizationMembers.designation", "=", "ADVOCATE")
      .where("OrganizationMembers.organizationId", "=", ctx.orgId)
      .select([
        "OrganizationMembers.memberId as id",
        "OrganizationMembers.name as name",
      ])
      .execute();
  }),

  updateMemberName: orgProtectedProcedure
    .input(UpdateUserNameInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.kysely
        .updateTable("OrganizationMembers")
        .set({ name: input.name })
        .where("organizationId", "=", ctx.orgId)
        .where("userId", "=", ctx.session.user.id)
        .execute();

      return { success: true };
    }),
} satisfies TRPCRouterRecord;
