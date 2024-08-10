import * as z from "zod";

import type { CompleteCaseImportTask } from "./index";
import { RelatedCaseImportTaskModel } from "./index";

// Helper schema for JSON fields
type Literal = boolean | number | string;
type Json = Literal | { [key: string]: Json } | Json[];
const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

export const CaseImportTaskLogModel = z.object({
  id: z.string(),
  taskId: z.string(),
  courtCode: z.string(),
  status: z.string(),
  message: z.string(),
  data: jsonSchema,
  created_at: z.date(),
  updatedAt: z.date().nullish(),
});

export interface CompleteCaseImportTaskLog
  extends z.infer<typeof CaseImportTaskLogModel> {
  task: CompleteCaseImportTask;
}

/**
 * RelatedCaseImportTaskLogModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCaseImportTaskLogModel: z.ZodSchema<CompleteCaseImportTaskLog> =
  z.lazy(() =>
    CaseImportTaskLogModel.extend({
      task: RelatedCaseImportTaskModel,
    }),
  );
