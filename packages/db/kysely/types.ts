import type { ColumnType } from "kysely";

import type {
  AdvocateCaseSide,
  CaseImportTaskStatus,
  OrgDesignation,
} from "./enums";

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Account = {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
};
export type AdvocateCase = {
  id: Generated<string>;
  caseId: string;
  advocateId: string;
  organizationId: string;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp | null;
};
export type Case = {
  id: Generated<string>;
  crn: string;
  courtId: string;
  typeName: string;
  number: string;
  regYear: string;
  title: string;
  description: string | null;
  petitioner: string;
  petitionerLawyers: string;
  respondent: string;
  respondentLawyers: string;
  dateOfDecision: Timestamp | null;
  nextHearingDate: Timestamp | null;
  side: AdvocateCaseSide;
  extraPetitioners: string | null;
  extraRespondents: string | null;
  extraParties: string | null;
  rawData: unknown;
  created_at: Generated<Timestamp>;
  updatedAt: Generated<Timestamp | null>;
  organizationId: string;
};
export type CaseImportTask = {
  id: Generated<string>;
  organizationId: string;
  courtComplexIds: unknown | null;
  advocateName: string;
  caseStatus: string;
  taskStatus: Generated<CaseImportTaskStatus>;
  taskMeta: unknown | null;
  created_by: string;
  created_at: Generated<Timestamp>;
  updatedAt: Timestamp | null;
  courtComplexId: string | null;
};
export type Court = {
  id: Generated<string>;
  courtCode: string;
  name: string;
  complexId: string;
  stateCode: string;
  districtCode: string;
};
export type CourtComplex = {
  id: Generated<string>;
  name: string;
  stateCode: string;
  districtCode: string;
  created_at: Generated<Timestamp>;
  updatedAt: Timestamp | null;
};
export type District = {
  name: string;
  stateCode: string;
  districtCode: string;
};
export type Organization = {
  id: Generated<string>;
  name: string;
  slug: string;
};
export type OrganizationMembers = {
  organizationId: string;
  userId: string;
  role: string;
  designation: OrgDesignation | null;
};
export type Post = {
  id: Generated<string>;
  title: string;
  content: string;
  created_at: Generated<Timestamp>;
  updatedAt: Timestamp | null;
};
export type Session = {
  sessionToken: string;
  userId: string;
  expires: Timestamp;
};
export type State = {
  stateCode: string;
  name: string;
};
export type User = {
  id: Generated<string>;
  name: string | null;
  email: string;
  emailVerified: Timestamp | null;
  image: string | null;
};
export type VerificationToken = {
  token: string;
  identifier: string;
  expires: Timestamp;
};
export type DB = {
  Account: Account;
  AdvocateCase: AdvocateCase;
  Case: Case;
  CaseImportTask: CaseImportTask;
  Court: Court;
  CourtComplex: CourtComplex;
  District: District;
  Organization: Organization;
  OrganizationMembers: OrganizationMembers;
  Post: Post;
  Session: Session;
  State: State;
  User: User;
  VerificationToken: VerificationToken;
};
