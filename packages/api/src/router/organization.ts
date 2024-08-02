import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { OrganizationCreateModel } from "../models";
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
  create: protectedProcedure
    .input(OrganizationCreateModel)
    .mutation(async ({ ctx, input }) => {
      await ctx.kysely
        .insertInto("Organization")
        .values(input)
        .executeTakeFirstOrThrow();

      return true;
    }),
} satisfies TRPCRouterRecord;
