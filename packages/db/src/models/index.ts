import { Prisma } from "@prisma/client";
import { z } from "zod";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput =
  | Prisma.JsonValue
  | null
  | "JsonNull"
  | "DbNull"
  | Prisma.NullTypes.DbNull
  | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === "DbNull") return Prisma.DbNull;
  if (v === "JsonNull") return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ]),
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal("DbNull"), z.literal("JsonNull")])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(
  () =>
    z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
      z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
      z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    ]),
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const AccountScalarFieldEnumSchema = z.enum([
  "userId",
  "type",
  "provider",
  "providerAccountId",
  "refresh_token",
  "access_token",
  "expires_at",
  "token_type",
  "scope",
  "id_token",
  "session_state",
]);

export const PostScalarFieldEnumSchema = z.enum([
  "id",
  "title",
  "content",
  "created_at",
  "updatedAt",
]);

export const SessionScalarFieldEnumSchema = z.enum([
  "sessionToken",
  "userId",
  "expires",
]);

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "email",
  "emailVerified",
  "image",
]);

export const VerificationTokenScalarFieldEnumSchema = z.enum([
  "token",
  "identifier",
  "expires",
]);

export const OrganizationScalarFieldEnumSchema = z.enum(["id", "name", "slug"]);

export const OrganizationMembersScalarFieldEnumSchema = z.enum([
  "organizationId",
  "userId",
  "memberId",
  "role",
  "designation",
]);

export const CaseScalarFieldEnumSchema = z.enum([
  "id",
  "crn",
  "courtId",
  "typeName",
  "number",
  "regYear",
  "title",
  "description",
  "petitioner",
  "petitionerLawyers",
  "respondent",
  "respondentLawyers",
  "dateOfDecision",
  "nextHearingDate",
  "side",
  "extraPetitioners",
  "extraRespondents",
  "extraParties",
  "rawData",
  "created_at",
  "updatedAt",
  "organizationId",
]);

export const AdvocateCaseScalarFieldEnumSchema = z.enum([
  "id",
  "caseId",
  "advocateId",
  "organizationId",
  "createdAt",
  "updatedAt",
]);

export const StateScalarFieldEnumSchema = z.enum(["stateCode", "name"]);

export const DistrictScalarFieldEnumSchema = z.enum([
  "name",
  "stateCode",
  "districtCode",
]);

export const CourtComplexScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "stateCode",
  "districtCode",
  "created_at",
  "updatedAt",
]);

export const CourtScalarFieldEnumSchema = z.enum([
  "id",
  "courtCode",
  "name",
  "complexId",
  "stateCode",
  "districtCode",
]);

export const CaseImportTaskScalarFieldEnumSchema = z.enum([
  "id",
  "organizationId",
  "courtComplexIds",
  "advocateId",
  "caseStatus",
  "taskStatus",
  "taskMeta",
  "created_by",
  "created_at",
  "updatedAt",
  "courtComplexId",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const JsonNullValueInputSchema = z
  .enum(["JsonNull"])
  .transform((value) => (value === "JsonNull" ? Prisma.JsonNull : value));

export const NullableJsonNullValueInputSchema = z
  .enum(["DbNull", "JsonNull"])
  .transform((value) =>
    value === "JsonNull"
      ? Prisma.JsonNull
      : value === "DbNull"
        ? Prisma.DbNull
        : value,
  );

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const JsonNullValueFilterSchema = z
  .enum(["DbNull", "JsonNull", "AnyNull"])
  .transform((value) =>
    value === "JsonNull"
      ? Prisma.JsonNull
      : value === "DbNull"
        ? Prisma.JsonNull
        : value === "AnyNull"
          ? Prisma.AnyNull
          : value,
  );

export const OrgDesignationSchema = z.enum(["ADVOCATE", "STAFF"]);

export type OrgDesignationType = `${z.infer<typeof OrgDesignationSchema>}`;

export const OrgRoleSchema = z.enum(["OWNER", "ADMIN", "MEMBER"]);

export type OrgRoleType = `${z.infer<typeof OrgRoleSchema>}`;

export const AdvocateCaseSideSchema = z.enum([
  "PETITIONER",
  "RESPONDENT",
  "UNKNOWN",
]);

export type AdvocateCaseSideType = `${z.infer<typeof AdvocateCaseSideSchema>}`;

export const CaseImportTaskStatusSchema = z.enum([
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "FAILED",
]);

export type CaseImportTaskStatusType =
  `${z.infer<typeof CaseImportTaskStatusSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_at: z.number().nullish(),
  token_type: z.string().nullish(),
  scope: z.string().nullish(),
  id_token: z.string().nullish(),
  session_state: z.string().nullish(),
});

export type Account = z.infer<typeof AccountSchema>;

// ACCOUNT RELATION SCHEMA
//------------------------------------------------------

export type AccountRelations = {
  user: UserWithRelations;
};

export type AccountWithRelations = z.infer<typeof AccountSchema> &
  AccountRelations;

export const AccountWithRelationsSchema: z.ZodType<AccountWithRelations> =
  AccountSchema.merge(
    z.object({
      user: z.lazy(() => UserWithRelationsSchema),
    }),
  );

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  created_at: z.coerce.date(),
  updatedAt: z.coerce.date().nullish(),
});

export type Post = z.infer<typeof PostSchema>;

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
});

export type Session = z.infer<typeof SessionSchema>;

// SESSION RELATION SCHEMA
//------------------------------------------------------

export type SessionRelations = {
  user: UserWithRelations;
};

export type SessionWithRelations = z.infer<typeof SessionSchema> &
  SessionRelations;

export const SessionWithRelationsSchema: z.ZodType<SessionWithRelations> =
  SessionSchema.merge(
    z.object({
      user: z.lazy(() => UserWithRelationsSchema),
    }),
  );

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string(),
  emailVerified: z.coerce.date().nullish(),
  image: z.string().nullish(),
});

export type User = z.infer<typeof UserSchema>;

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  account: AccountWithRelations[];
  session: SessionWithRelations[];
  CaseImportTask: CaseImportTaskWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations;

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> =
  UserSchema.merge(
    z.object({
      account: z.lazy(() => AccountWithRelationsSchema).array(),
      session: z.lazy(() => SessionWithRelationsSchema).array(),
      CaseImportTask: z.lazy(() => CaseImportTaskWithRelationsSchema).array(),
    }),
  );

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  token: z.string(),
  identifier: z.string(),
  expires: z.coerce.date(),
});

export type VerificationToken = z.infer<typeof VerificationTokenSchema>;

/////////////////////////////////////////
// ORGANIZATION SCHEMA
/////////////////////////////////////////

export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export type Organization = z.infer<typeof OrganizationSchema>;

// ORGANIZATION RELATION SCHEMA
//------------------------------------------------------

export type OrganizationRelations = {
  cases: CaseWithRelations[];
  CaseImportTask: CaseImportTaskWithRelations[];
};

export type OrganizationWithRelations = z.infer<typeof OrganizationSchema> &
  OrganizationRelations;

export const OrganizationWithRelationsSchema: z.ZodType<OrganizationWithRelations> =
  OrganizationSchema.merge(
    z.object({
      cases: z.lazy(() => CaseWithRelationsSchema).array(),
      CaseImportTask: z.lazy(() => CaseImportTaskWithRelationsSchema).array(),
    }),
  );

/////////////////////////////////////////
// ORGANIZATION MEMBERS SCHEMA
/////////////////////////////////////////

export const OrganizationMembersSchema = z.object({
  role: OrgRoleSchema,
  designation: OrgDesignationSchema.nullish(),
  organizationId: z.string(),
  userId: z.string(),
  memberId: z.string(),
});

export type OrganizationMembers = z.infer<typeof OrganizationMembersSchema>;

// ORGANIZATION MEMBERS RELATION SCHEMA
//------------------------------------------------------

export type OrganizationMembersRelations = {
  CaseImportTask: CaseImportTaskWithRelations[];
};

export type OrganizationMembersWithRelations = z.infer<
  typeof OrganizationMembersSchema
> &
  OrganizationMembersRelations;

export const OrganizationMembersWithRelationsSchema: z.ZodType<OrganizationMembersWithRelations> =
  OrganizationMembersSchema.merge(
    z.object({
      CaseImportTask: z.lazy(() => CaseImportTaskWithRelationsSchema).array(),
    }),
  );

/////////////////////////////////////////
// CASE SCHEMA
/////////////////////////////////////////

export const CaseSchema = z.object({
  side: AdvocateCaseSideSchema,
  id: z.string(),
  crn: z.string(),
  courtId: z.string(),
  typeName: z.string(),
  number: z.string(),
  regYear: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  petitioner: z.string(),
  petitionerLawyers: z.string(),
  respondent: z.string(),
  respondentLawyers: z.string(),
  dateOfDecision: z.coerce.date().nullish(),
  nextHearingDate: z.coerce.date().nullish(),
  extraPetitioners: z.string().nullish(),
  extraRespondents: z.string().nullish(),
  extraParties: z.string().nullish(),
  rawData: JsonValueSchema,
  created_at: z.coerce.date(),
  updatedAt: z.coerce.date().nullish(),
  organizationId: z.string(),
});

export type Case = z.infer<typeof CaseSchema>;

// CASE RELATION SCHEMA
//------------------------------------------------------

export type CaseRelations = {
  Organization: OrganizationWithRelations;
  Court: CourtWithRelations;
  AdvocateCase: AdvocateCaseWithRelations[];
};

export type CaseWithRelations = z.infer<typeof CaseSchema> & CaseRelations;

export const CaseWithRelationsSchema: z.ZodType<CaseWithRelations> =
  CaseSchema.merge(
    z.object({
      Organization: z.lazy(() => OrganizationWithRelationsSchema),
      Court: z.lazy(() => CourtWithRelationsSchema),
      AdvocateCase: z.lazy(() => AdvocateCaseWithRelationsSchema).array(),
    }),
  );

/////////////////////////////////////////
// ADVOCATE CASE SCHEMA
/////////////////////////////////////////

export const AdvocateCaseSchema = z.object({
  id: z.string(),
  caseId: z.string(),
  advocateId: z.string(),
  organizationId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullish(),
});

export type AdvocateCase = z.infer<typeof AdvocateCaseSchema>;

// ADVOCATE CASE RELATION SCHEMA
//------------------------------------------------------

export type AdvocateCaseRelations = {
  Case: CaseWithRelations;
};

export type AdvocateCaseWithRelations = z.infer<typeof AdvocateCaseSchema> &
  AdvocateCaseRelations;

export const AdvocateCaseWithRelationsSchema: z.ZodType<AdvocateCaseWithRelations> =
  AdvocateCaseSchema.merge(
    z.object({
      Case: z.lazy(() => CaseWithRelationsSchema),
    }),
  );

/////////////////////////////////////////
// STATE SCHEMA
/////////////////////////////////////////

export const StateSchema = z.object({
  stateCode: z.string(),
  name: z.string(),
});

export type State = z.infer<typeof StateSchema>;

// STATE RELATION SCHEMA
//------------------------------------------------------

export type StateRelations = {
  District: DistrictWithRelations[];
};

export type StateWithRelations = z.infer<typeof StateSchema> & StateRelations;

export const StateWithRelationsSchema: z.ZodType<StateWithRelations> =
  StateSchema.merge(
    z.object({
      District: z.lazy(() => DistrictWithRelationsSchema).array(),
    }),
  );

/////////////////////////////////////////
// DISTRICT SCHEMA
/////////////////////////////////////////

export const DistrictSchema = z.object({
  name: z.string(),
  stateCode: z.string(),
  districtCode: z.string(),
});

export type District = z.infer<typeof DistrictSchema>;

// DISTRICT RELATION SCHEMA
//------------------------------------------------------

export type DistrictRelations = {
  state: StateWithRelations;
  CourtComplex: CourtComplexWithRelations[];
  Court: CourtWithRelations[];
};

export type DistrictWithRelations = z.infer<typeof DistrictSchema> &
  DistrictRelations;

export const DistrictWithRelationsSchema: z.ZodType<DistrictWithRelations> =
  DistrictSchema.merge(
    z.object({
      state: z.lazy(() => StateWithRelationsSchema),
      CourtComplex: z.lazy(() => CourtComplexWithRelationsSchema).array(),
      Court: z.lazy(() => CourtWithRelationsSchema).array(),
    }),
  );

/////////////////////////////////////////
// COURT COMPLEX SCHEMA
/////////////////////////////////////////

export const CourtComplexSchema = z.object({
  id: z.string(),
  name: z.string(),
  stateCode: z.string(),
  districtCode: z.string(),
  created_at: z.coerce.date(),
  updatedAt: z.coerce.date().nullish(),
});

export type CourtComplex = z.infer<typeof CourtComplexSchema>;

// COURT COMPLEX RELATION SCHEMA
//------------------------------------------------------

export type CourtComplexRelations = {
  district: DistrictWithRelations;
  Court: CourtWithRelations[];
  CaseImportTask: CaseImportTaskWithRelations[];
};

export type CourtComplexWithRelations = z.infer<typeof CourtComplexSchema> &
  CourtComplexRelations;

export const CourtComplexWithRelationsSchema: z.ZodType<CourtComplexWithRelations> =
  CourtComplexSchema.merge(
    z.object({
      district: z.lazy(() => DistrictWithRelationsSchema),
      Court: z.lazy(() => CourtWithRelationsSchema).array(),
      CaseImportTask: z.lazy(() => CaseImportTaskWithRelationsSchema).array(),
    }),
  );

/////////////////////////////////////////
// COURT SCHEMA
/////////////////////////////////////////

export const CourtSchema = z.object({
  id: z.string(),
  courtCode: z.string(),
  name: z.string(),
  complexId: z.string(),
  stateCode: z.string(),
  districtCode: z.string(),
});

export type Court = z.infer<typeof CourtSchema>;

// COURT RELATION SCHEMA
//------------------------------------------------------

export type CourtRelations = {
  district: DistrictWithRelations;
  complex: CourtComplexWithRelations;
  cases: CaseWithRelations[];
};

export type CourtWithRelations = z.infer<typeof CourtSchema> & CourtRelations;

export const CourtWithRelationsSchema: z.ZodType<CourtWithRelations> =
  CourtSchema.merge(
    z.object({
      district: z.lazy(() => DistrictWithRelationsSchema),
      complex: z.lazy(() => CourtComplexWithRelationsSchema),
      cases: z.lazy(() => CaseWithRelationsSchema).array(),
    }),
  );

/////////////////////////////////////////
// CASE IMPORT TASK SCHEMA
/////////////////////////////////////////

export const CaseImportTaskSchema = z.object({
  taskStatus: CaseImportTaskStatusSchema,
  id: z.string(),
  organizationId: z.string(),
  courtComplexIds: JsonValueSchema.nullable(),
  advocateId: z.string(),
  caseStatus: z.string(),
  taskMeta: JsonValueSchema.nullable(),
  created_by: z.string(),
  created_at: z.coerce.date(),
  updatedAt: z.coerce.date().nullish(),
  courtComplexId: z.string().nullish(),
});

export type CaseImportTask = z.infer<typeof CaseImportTaskSchema>;

// CASE IMPORT TASK RELATION SCHEMA
//------------------------------------------------------

export type CaseImportTaskRelations = {
  advocate: OrganizationMembersWithRelations;
  user: UserWithRelations;
  organization: OrganizationWithRelations;
  CourtComplex?: CourtComplexWithRelations | null;
};

export type CaseImportTaskWithRelations = Omit<
  z.infer<typeof CaseImportTaskSchema>,
  "courtComplexIds" | "taskMeta"
> & {
  courtComplexIds?: JsonValueType | null;
  taskMeta?: JsonValueType | null;
} & CaseImportTaskRelations;

export const CaseImportTaskWithRelationsSchema: z.ZodType<CaseImportTaskWithRelations> =
  CaseImportTaskSchema.merge(
    z.object({
      advocate: z.lazy(() => OrganizationMembersWithRelationsSchema),
      user: z.lazy(() => UserWithRelationsSchema),
      organization: z.lazy(() => OrganizationWithRelationsSchema),
      CourtComplex: z.lazy(() => CourtComplexWithRelationsSchema).nullish(),
    }),
  );
