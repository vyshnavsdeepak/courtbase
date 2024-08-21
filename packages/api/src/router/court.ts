import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { inngest } from "@court-base/event-funnel";

import { CreateCaseImportTaskParamsSchema } from "../models";
import { orgProtectedProcedure } from "../trpc";

export const courtRouter = {
  states: orgProtectedProcedure.query(async ({ ctx }) => {
    return ctx.kysely
      .selectFrom("State")
      .select(["stateCode", "name"])
      .execute();
  }),
  districts: orgProtectedProcedure
    .input(z.object({ stateCode: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.kysely
        .selectFrom("District")
        .select(["districtCode", "name"])
        .where("stateCode", "=", input.stateCode)
        .execute();
    }),
  getCourtComplexes: orgProtectedProcedure
    .input(z.object({ districtCode: z.string(), stateCode: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.kysely
        .selectFrom("CourtComplex")
        .select(["id", "name"])
        .where("stateCode", "=", input.stateCode)
        .where("districtCode", "=", input.districtCode)
        .execute();
    }),
  createCaseImportTask: orgProtectedProcedure
    .input(CreateCaseImportTaskParamsSchema)
    .mutation(async ({ ctx, input }) => {
      const courtComplexIds = input.courtComplexIds;
      const userId = ctx.session.user.id;
      const orgId = ctx.orgId;
      const advocate = input.advocate;

      const { id } = await ctx.kysely
        .insertInto("CaseImportTask")
        .values({
          organizationId: orgId,
          courtComplexIds: {
            complexes: courtComplexIds,
          },
          advocateName: advocate,
          caseStatus: input.status,
          taskStatus: "PENDING",
          created_by: userId,
        })
        .returning("id")
        .executeTakeFirstOrThrow()
        .catch((e) => {
          console.error(e);
          throw new Error("Failed to create case import task. (E-3)");
        });

      const event = await inngest
        .send({
          id,
          name: "app/import-by-court-complex",
          data: {
            payload: {
              advocate,
              status: input.status,
              courtComplexIds,
            },
            identity: {
              userId,
              orgId,
            },
          },
        })
        .catch(() => {
          throw new Error("Failed to queue case import task. (E-1)");
        });

      const taskId = event.ids[0];
      if (!taskId) {
        // one id will always be returned as we are sending one event
        throw new Error("Failed to queue case import task. (E-2)");
      }
    }),
} satisfies TRPCRouterRecord;
