import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { PostModel } from "@court-base/db/models";

import { protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = {
  all: publicProcedure.query(({ ctx }) => {
    return ctx.kysely
      .selectFrom("Post")
      .selectAll()
      .orderBy("id", "desc")
      .limit(10)
      .execute();
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.kysely
        .selectFrom("Post")
        .selectAll()
        .where("id", "=", input.id)
        .executeTakeFirst();
    }),

  create: protectedProcedure
    .input(
      PostModel.pick({
        title: true,
        content: true,
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.kysely.insertInto("Post").values(input).execute();
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.kysely.deleteFrom("Post").where("id", "=", input).execute();
  }),
} satisfies TRPCRouterRecord;
