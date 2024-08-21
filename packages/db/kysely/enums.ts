export const OrgDesignation = {
  ADVOCATE: "ADVOCATE",
  STAFF: "STAFF",
} as const;
export type OrgDesignation =
  (typeof OrgDesignation)[keyof typeof OrgDesignation];
export const AdvocateCaseSide = {
  PETITIONER: "PETITIONER",
  RESPONDENT: "RESPONDENT",
  UNKNOWN: "UNKNOWN",
} as const;
export type AdvocateCaseSide =
  (typeof AdvocateCaseSide)[keyof typeof AdvocateCaseSide];
export const CaseImportTaskStatus = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;
export type CaseImportTaskStatus =
  (typeof CaseImportTaskStatus)[keyof typeof CaseImportTaskStatus];
