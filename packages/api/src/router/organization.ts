import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { MemberRole, OrganizationCreateModel } from "../models";
import {
  orgProtectedProcedure,
  protectedProcedure,
  publicProcedure,
} from "../trpc";
import { generateMemberId } from "../utils/user-utils";

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
      if (!ctx.session.user.name) {
        // Todo: Make sure to collect name from user
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "[E-ORG-001] User name is required",
        });
      }

      const org = await ctx.kysely
        .insertInto("Organization")
        .values(input)
        .returning(["id", "name"])
        .executeTakeFirstOrThrow();

      const memberId = generateMemberId(ctx.session.user.name);
      await ctx.kysely
        .insertInto("OrganizationMembers")
        .values({
          organizationId: org.id,
          userId: ctx.session.user.id,
          memberId,
          role: MemberRole.enum.OWNER,
        })
        .executeTakeFirstOrThrow();

      return org;
    }),
  getAdvocates: orgProtectedProcedure.query(async ({ ctx }) => {
    return ctx.kysely
      .selectFrom("OrganizationMembers")
      .leftJoin("User", "OrganizationMembers.userId", "User.id")
      .where("OrganizationMembers.designation", "=", "ADVOCATE")
      .where("OrganizationMembers.organizationId", "=", ctx.orgId)
      .select(["OrganizationMembers.memberId as id", "User.name as name"]) // TODO: Bring name to OrganizationMembers
      .execute()
      .then((results) => results.filter((result) => result.name != null))
      .then((results) => results as { id: string; name: string }[]);
  }),
} satisfies TRPCRouterRecord;
