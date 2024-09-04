import type { TRPCRouterRecord } from "@trpc/server";

import { inngest } from "@court-base/event-funnel";

import { CreateCaseImportTaskParamsSchema } from "../models";
import { orgProtectedProcedure } from "../trpc";

export const caseImportRouter = {
  create: orgProtectedProcedure
    .input(CreateCaseImportTaskParamsSchema)
    .mutation(async ({ ctx, input }) => {
      const courtComplexIds = input.courtComplexIds;
      const userId = ctx.session.user.id;
      const orgId = ctx.orgId;
      const advocateId = input.advocateId;

      const advocate = await ctx.kysely
        .selectFrom("OrganizationMembers")
        .leftJoin("User", "User.id", "OrganizationMembers.userId")
        // TODO: Remove this join, as name is moved to OrganizationMembers table
        .select(["User.name as name"])
        .where("memberId", "=", advocateId)
        .where("organizationId", "=", orgId)
        .executeTakeFirstOrThrow();

      const advocateName = advocate.name;
      if (!advocateName) {
        throw new Error("Advocate name not found. (E-2)");
      }

      const { id: caseImportTaskId } = await ctx.kysely
        .insertInto("CaseImportTask")
        .values({
          organizationId: orgId,
          courtComplexIds: {
            complexes: courtComplexIds,
          },
          advocateId,
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
          name: "app/import-by-court-complex",
          data: {
            payload: {
              advocateId,
              status: input.status,
              courtComplexIds,
            },
            identity: {
              orgId,
            },
            tracking: {
              caseImportTaskId,
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
  all: orgProtectedProcedure.query(async ({ ctx }) => {
    return ctx.kysely
      .selectFrom("CaseImportTask")
      .select(["id", "taskStatus", "caseStatus", "created_at"])
      .execute();
  }),
} satisfies TRPCRouterRecord;
