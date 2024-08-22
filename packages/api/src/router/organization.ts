import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { MemberRole, OrganizationCreateModel } from "../models";
import { protectedProcedure, publicProcedure } from "../trpc";

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
  bySlug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.kysely
        .selectFrom("Organization")
        .select("id")
        .where("slug", "=", input.slug)
        .executeTakeFirstOrThrow();
    }),
  getAllByUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.kysely
      .selectFrom("Organization")
      .innerJoin(
        "OrganizationMembers",
        "Organization.id",
        "OrganizationMembers.organizationId",
      )
      .select(["Organization.id", "Organization.name", "Organization.slug"])
      .where("OrganizationMembers.userId", "=", ctx.session.user.id)
      .execute();
  }),
  create: protectedProcedure
    .input(OrganizationCreateModel)
    .mutation(async ({ ctx, input }) => {
      const org = await ctx.kysely
        .insertInto("Organization")
        .values(input)
        .returning(["id", "name", "slug"])
        .executeTakeFirstOrThrow();

      await ctx.kysely
        .insertInto("OrganizationMembers")
        .values({
          organizationId: org.id,
          userId: ctx.session.user.id,
          role: MemberRole.enum.OWNER,
        })
        .executeTakeFirstOrThrow();

      return org;
    }),
} satisfies TRPCRouterRecord;
