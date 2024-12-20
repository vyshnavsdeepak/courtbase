
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.18.0
 * Query Engine version: 4c784e32044a8a016d99474bd02a3b6123742169
 */
Prisma.prismaVersion = {
  client: "5.18.0",
  engine: "4c784e32044a8a016d99474bd02a3b6123742169"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AccountScalarFieldEnum = {
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  title: 'title',
  content: 'content',
  created_at: 'created_at',
  updatedAt: 'updatedAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  image: 'image'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  token: 'token',
  identifier: 'identifier',
  expires: 'expires'
};

exports.Prisma.OrganizationScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.OrganizationMembersScalarFieldEnum = {
  organizationId: 'organizationId',
  userId: 'userId',
  memberId: 'memberId',
  role: 'role',
  designation: 'designation'
};

exports.Prisma.CaseScalarFieldEnum = {
  id: 'id',
  crn: 'crn',
  courtId: 'courtId',
  typeName: 'typeName',
  number: 'number',
  regYear: 'regYear',
  title: 'title',
  customTitle: 'customTitle',
  description: 'description',
  petitioner: 'petitioner',
  petitionerLawyers: 'petitionerLawyers',
  respondent: 'respondent',
  respondentLawyers: 'respondentLawyers',
  dateOfDecision: 'dateOfDecision',
  nextHearingDate: 'nextHearingDate',
  side: 'side',
  extraPetitioners: 'extraPetitioners',
  extraRespondents: 'extraRespondents',
  extraParties: 'extraParties',
  rawData: 'rawData',
  created_at: 'created_at',
  updatedAt: 'updatedAt',
  organizationId: 'organizationId'
};

exports.Prisma.CaseHistoryItemScalarFieldEnum = {
  crn: 'crn',
  businessOnDate: 'businessOnDate',
  purposeOfHearing: 'purposeOfHearing',
  hearingDate: 'hearingDate',
  notes: 'notes',
  organizationId: 'organizationId'
};

exports.Prisma.AdvocateCaseScalarFieldEnum = {
  id: 'id',
  caseId: 'caseId',
  advocateId: 'advocateId',
  organizationId: 'organizationId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.StateScalarFieldEnum = {
  stateCode: 'stateCode',
  name: 'name'
};

exports.Prisma.DistrictScalarFieldEnum = {
  name: 'name',
  stateCode: 'stateCode',
  districtCode: 'districtCode'
};

exports.Prisma.CourtComplexScalarFieldEnum = {
  id: 'id',
  name: 'name',
  complexCode: 'complexCode',
  stateCode: 'stateCode',
  districtCode: 'districtCode',
  isMasterCourtComplex: 'isMasterCourtComplex',
  masterComplexCourtCode: 'masterComplexCourtCode',
  created_at: 'created_at',
  updatedAt: 'updatedAt'
};

exports.Prisma.DistrictCourtScalarFieldEnum = {
  id: 'id',
  courtCode: 'courtCode',
  name: 'name',
  complexId: 'complexId',
  stateCode: 'stateCode',
  districtCode: 'districtCode'
};

exports.Prisma.CaseTypeScalarFieldEnum = {
  id: 'id',
  label: 'label',
  code: 'code',
  complexId: 'complexId'
};

exports.Prisma.ManualCaseImportTaskScalarFieldEnum = {
  id: 'id',
  caseType: 'caseType',
  number: 'number',
  regYear: 'regYear',
  districtCourtId: 'districtCourtId',
  complexId: 'complexId',
  importStatus: 'importStatus',
  caseId: 'caseId',
  createdBy: 'createdBy',
  response: 'response',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  organizationId: 'organizationId'
};

exports.Prisma.CaseImportTaskScalarFieldEnum = {
  id: 'id',
  organizationId: 'organizationId',
  courtComplexIds: 'courtComplexIds',
  advocateId: 'advocateId',
  caseStatus: 'caseStatus',
  taskStatus: 'taskStatus',
  taskMeta: 'taskMeta',
  created_by: 'created_by',
  created_at: 'created_at',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.OrgRole = exports.$Enums.OrgRole = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER'
};

exports.OrgDesignation = exports.$Enums.OrgDesignation = {
  ADVOCATE: 'ADVOCATE',
  STAFF: 'STAFF'
};

exports.AdvocateCaseSide = exports.$Enums.AdvocateCaseSide = {
  PETITIONER: 'PETITIONER',
  RESPONDENT: 'RESPONDENT',
  UNKNOWN: 'UNKNOWN'
};

exports.CaseImportTaskStatus = exports.$Enums.CaseImportTaskStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

exports.Prisma.ModelName = {
  Account: 'Account',
  Post: 'Post',
  Session: 'Session',
  User: 'User',
  VerificationToken: 'VerificationToken',
  Organization: 'Organization',
  OrganizationMembers: 'OrganizationMembers',
  Case: 'Case',
  CaseHistoryItem: 'CaseHistoryItem',
  AdvocateCase: 'AdvocateCase',
  State: 'State',
  District: 'District',
  CourtComplex: 'CourtComplex',
  DistrictCourt: 'DistrictCourt',
  CaseType: 'CaseType',
  ManualCaseImportTask: 'ManualCaseImportTask',
  CaseImportTask: 'CaseImportTask'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/vyshnav/src/github.com/PaintermanLab/court-base/packages/db/prisma/generated/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/Users/vyshnav/src/github.com/PaintermanLab/court-base/packages/db/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../..",
  "clientVersion": "5.18.0",
  "engineVersion": "4c784e32044a8a016d99474bd02a3b6123742169",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"./generated/client\"\n}\n\ndatasource db {\n  provider  = \"postgresql\"\n  url       = env(\"DATABASE_URL\")\n  directUrl = env(\"DIRECT_URL\")\n}\n\ngenerator kysely {\n  provider     = \"prisma-kysely\"\n  output       = \"../kysely\"\n  fileName     = \"types.ts\"\n  enumFileName = \"enums.ts\"\n}\n\ngenerator zod {\n  provider                         = \"zod-prisma-types\"\n  output                           = \"../src/models\" // default is ./generated/zod\n  useMultipleFiles                 = false // default is false\n  writeBarrelFiles                 = false // default is true\n  createInputTypes                 = false // default is true\n  createModelTypes                 = true // default is true\n  addInputTypeValidation           = false // default is true\n  addIncludeType                   = false // default is true\n  addSelectType                    = false // default is true\n  validateWhereUniqueInput         = true // default is true\n  createOptionalDefaultValuesTypes = false // default is false\n  createRelationValuesTypes        = true // default is false\n  createPartialTypes               = false // default is false\n  useDefaultValidators             = false // default is true\n  coerceDate                       = true // default is true\n  writeNullishInModelTypes         = true // default is false\n  prismaClientPath                 = \"../../prisma/generated/client\"\n}\n\nmodel Account {\n  userId            String  @db.Uuid\n  type              String  @db.VarChar(255)\n  provider          String  @db.VarChar(255)\n  providerAccountId String  @db.VarChar(255)\n  refresh_token     String? @db.VarChar(255)\n  access_token      String?\n  expires_at        Int?\n  token_type        String? @db.VarChar(255)\n  scope             String? @db.VarChar(255)\n  id_token          String?\n  session_state     String? @db.VarChar(255)\n  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: \"account_userId_user_id_fk\")\n\n  @@id([provider, providerAccountId], map: \"account_provider_providerAccountId_pk\")\n}\n\nmodel Post {\n  id         String    @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  title      String    @db.VarChar(256)\n  content    String\n  created_at DateTime  @default(now()) @db.Timestamp(6)\n  updatedAt  DateTime? @db.Timestamptz(6)\n}\n\nmodel Session {\n  sessionToken String   @id @db.VarChar(255)\n  userId       String   @db.Uuid\n  expires      DateTime @db.Timestamptz(6)\n  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: \"session_userId_user_id_fk\")\n}\n\nmodel User {\n  id            String    @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  name          String?   @db.VarChar(255)\n  email         String    @db.VarChar(255)\n  emailVerified DateTime? @db.Timestamptz(6)\n  image         String?   @db.VarChar(255)\n  account       Account[]\n  session       Session[]\n}\n\nmodel VerificationToken {\n  token      String   @id @db.VarChar(255)\n  identifier String   @db.VarChar(255)\n  expires    DateTime @db.Timestamptz(6)\n\n  @@unique([identifier, token], map: \"verificationToken_identifier_token_unique\")\n}\n\nmodel Organization {\n  id                  String                @id\n  name                String                @db.VarChar(255)\n  OrganizationMembers OrganizationMembers[]\n  Case                Case[]\n  AdvocateCase        AdvocateCase[]\n  CaseImportTask      CaseImportTask[]\n\n  ManualCaseImportTask ManualCaseImportTask[] @relation(map: \"manualCaseImportTask_organizationId_organization_id_fk\")\n}\n\nenum OrgDesignation {\n  ADVOCATE\n  STAFF\n}\n\nenum OrgRole {\n  OWNER\n  ADMIN\n  MEMBER\n}\n\nmodel OrganizationMembers {\n  organizationId String\n  userId         String          @db.Uuid\n  memberId       String          @db.VarChar(255) // human readable slug based on name - unique in organization\n  role           OrgRole         @default(MEMBER)\n  designation    OrgDesignation?\n\n  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade, onUpdate: Cascade, map: \"organizationMembers_organizationId_organization_id_fk\")\n\n  // Only OrgDesignation.ADVOCATE will have AdvocateCase and CaseImportTask\n  AdvocateCase         AdvocateCase[]\n  CaseImportTask       CaseImportTask[]\n  ManualCaseImportTask ManualCaseImportTask[]\n\n  @@id([organizationId, memberId], map: \"organizationMembers_organizationId_memberId_pk\")\n  @@unique([organizationId, userId], map: \"organizationMembers_organizationId_userId_unique\")\n  @@index([organizationId, designation], map: \"organizationMembers_organizationId_designation_idx\")\n}\n\nenum AdvocateCaseSide {\n  PETITIONER\n  RESPONDENT\n  UNKNOWN\n}\n\nmodel Case {\n  id                String    @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  crn               String    @db.VarChar(16)\n  courtId           String\n  typeName          String    @db.VarChar(50) // eg. OP, OS, CC, MC\n  number            String    @db.VarChar(10) // eg. 232\n  regYear           String    @db.VarChar(4) // eg. 2021\n  // typeName/number/regYear is unique in a court = eg. OP/232/2021\n  title             String    @db.VarChar(255)\n  customTitle       String?   @db.VarChar(255)\n  description       String?   @db.VarChar(255)\n  petitioner        String    @db.VarChar(255)\n  petitionerLawyers String    @db.VarChar(255)\n  respondent        String    @db.VarChar(255)\n  respondentLawyers String?   @db.VarChar(255)\n  dateOfDecision    DateTime? @db.Date\n  nextHearingDate   DateTime? @db.Date\n\n  // side - petitioner/respondent\n  side             AdvocateCaseSide\n  extraPetitioners String?          @db.VarChar(255)\n  extraRespondents String?          @db.VarChar(255)\n  extraParties     String?          @db.VarChar(255)\n\n  rawData    Json      @db.Json\n  created_at DateTime  @default(now()) @db.Timestamp(6)\n  updatedAt  DateTime? @db.Timestamptz(6)\n\n  organizationId String\n\n  DistrictCourt DistrictCourt  @relation(fields: [courtId], references: [id], onDelete: NoAction, onUpdate: Cascade, map: \"eCourtCase_courtId_districtcourt_id_fk\")\n  AdvocateCase  AdvocateCase[] @relation(map: \"advocateCase_caseId_case_id_fk\")\n\n  organization         Organization           @relation(fields: [organizationId], references: [id], onDelete: Cascade, onUpdate: Cascade, map: \"case_organizationId_organization_id_fk\")\n  ManualCaseImportTask ManualCaseImportTask[]\n  CaseHistory          CaseHistoryItem[]\n\n  // to lookup case by case number of type OP/232/2021, we need to have a unique constraint on typeName, caseNo, caseRegYear per court per organization\n  @@unique([organizationId, typeName, number, regYear, courtId], map: \"case_organization_typeName_number_regYear_courtId_unique\")\n  @@unique([organizationId, crn], map: \"case_organization_organization_id_fk\")\n}\n\nmodel CaseHistoryItem {\n  crn              String    @db.VarChar(16)\n  businessOnDate   DateTime  @db.Date\n  purposeOfHearing String    @db.VarChar(50)\n  hearingDate      DateTime? @db.Date\n  notes            String?   @db.VarChar(255)\n  organizationId   String\n  case             Case      @relation(fields: [organizationId, crn], references: [organizationId, crn], onDelete: Cascade, onUpdate: NoAction)\n\n  @@id([organizationId, crn, businessOnDate])\n}\n\nmodel AdvocateCase {\n  id             String    @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  caseId         String    @db.Uuid\n  advocateId     String\n  organizationId String\n  createdAt      DateTime  @default(now()) @db.Timestamp(6)\n  updatedAt      DateTime? @db.Timestamptz(6)\n\n  Case         Case                @relation(fields: [caseId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: \"advocateCase_caseId_case_id_fk\")\n  orgMember    OrganizationMembers @relation(fields: [advocateId, organizationId], references: [memberId, organizationId], onDelete: Cascade, onUpdate: Cascade)\n  Organization Organization        @relation(fields: [organizationId], references: [id])\n\n  @@unique([caseId, advocateId, organizationId], map: \"advocateCase_caseId_advocateId_organizationId_unique\")\n}\n\nmodel State {\n  stateCode String     @id @db.VarChar(2) // State code is unique to India\n  name      String     @db.VarChar(255)\n  District  District[]\n}\n\nmodel District {\n  name          String          @db.VarChar(255)\n  stateCode     String          @db.VarChar(2)\n  districtCode  String          @db.VarChar(2) // this districtCode is unique in state only, thus having a composite key with stateCode\n  state         State           @relation(fields: [stateCode], references: [stateCode], onDelete: NoAction, onUpdate: NoAction, map: \"district_state_stateCode_fk\")\n  CourtComplex  CourtComplex[]\n  DistrictCourt DistrictCourt[] @relation(map: \"court_district_stateCode_districtCode_fk\")\n\n  @@id([stateCode, districtCode], map: \"district_stateCode_districtCode_pk\")\n}\n\nmodel CourtComplex {\n  id                     String                 @id\n  name                   String                 @db.VarChar(255)\n  complexCode            String?                @db.VarChar(30)\n  stateCode              String\n  districtCode           String\n  district               District               @relation(fields: [stateCode, districtCode], references: [stateCode, districtCode], onDelete: NoAction, onUpdate: NoAction, map: \"courtComplex_stateCode_districtCode_fk\")\n  isMasterCourtComplex   Boolean                @default(false)\n  masterComplexCourtCode String?                @db.VarChar(3)\n  created_at             DateTime               @default(now()) @db.Timestamp(6)\n  updatedAt              DateTime?              @db.Timestamptz(6)\n  DistrictCourt          DistrictCourt[]        @relation(map: \"court_complexId_courtComplex_id_fk\")\n  CaseType               CaseType[]\n  ManualCaseImportTask   ManualCaseImportTask[]\n\n  @@unique([stateCode, districtCode, complexCode], map: \"courtComplex_stateCode_districtCode_complexCode_unique\")\n}\n\nmodel DistrictCourt {\n  id                   String                 @id\n  courtCode            String                 @db.VarChar(3) // court code is unique in a district\n  name                 String                 @db.VarChar(255)\n  complexId            String\n  stateCode            String                 @db.VarChar(2)\n  districtCode         String                 @db.VarChar(2)\n  district             District               @relation(fields: [stateCode, districtCode], references: [stateCode, districtCode], onDelete: NoAction, onUpdate: NoAction, map: \"court_district_stateCode_districtCode_fk\")\n  complex              CourtComplex           @relation(fields: [complexId], references: [id], onDelete: NoAction, onUpdate: Cascade, map: \"court_complexId_courtComplex_id_fk\")\n  cases                Case[]                 @relation(map: \"Case_courtId_court_id_fk\")\n  ManualCaseImportTask ManualCaseImportTask[] @relation(map: \"manualCaseImportTask_districtCourtId_districtcourt_id_fk\")\n\n  @@unique([stateCode, districtCode, courtCode], map: \"districtcourt_stateCode_districtCode_courtCode_unique\")\n}\n\nmodel CaseType {\n  id                   String                 @id\n  label                String                 @db.VarChar(255)\n  code                 String                 @db.VarChar(50)\n  complexId            String\n  ManualCaseImportTask ManualCaseImportTask[]\n  Complex              CourtComplex           @relation(fields: [complexId], references: [id], onDelete: NoAction, onUpdate: Cascade)\n\n  @@unique([complexId, code])\n}\n\nenum CaseImportTaskStatus {\n  PENDING\n  IN_PROGRESS\n  COMPLETED\n  FAILED\n}\n\nmodel ManualCaseImportTask {\n  id              String        @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  // typeName is eg. OP, OS, CC; should be infered from caseTypeCode\n  caseType        String // eg. 47\n  number          String        @db.VarChar(10) // eg. 232\n  regYear         String        @db.VarChar(4) // eg. 2021\n  CaseType        CaseType      @relation(fields: [complexId, caseType], references: [complexId, code], onDelete: NoAction, onUpdate: Cascade)\n  // typeName/number/regYear is unique in a court = eg. OP/232/2021\n  districtCourtId String\n  districtCourt   DistrictCourt @relation(fields: [districtCourtId], references: [id], onDelete: Cascade, onUpdate: Cascade, map: \"manualCaseImportTask_districtCourtId_districtcourt_id_fk\")\n  complexId       String\n  // Note: Complex id was introduced only for relation to CaseTypes using code and CaseType\n  // Now, complex id is the only way to get courtCode if court selected is a masterComplex\n  complex         CourtComplex  @relation(fields: [complexId], references: [id], onDelete: NoAction, onUpdate: Cascade)\n\n  importStatus CaseImportTaskStatus @default(PENDING)\n\n  caseId String? @db.Uuid\n  case   Case?   @relation(fields: [caseId], references: [id], onDelete: NoAction, onUpdate: Cascade)\n\n  createdBy String\n  creator   OrganizationMembers @relation(fields: [createdBy, organizationId], references: [memberId, organizationId], onDelete: NoAction, onUpdate: Cascade)\n\n  response Json?\n\n  createdAt DateTime  @default(now()) @db.Timestamp(6)\n  updatedAt DateTime? @db.Timestamptz(6)\n\n  organizationId String\n  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade, onUpdate: Cascade, map: \"manualCaseImportTask_organizationId_organization_id_fk\")\n\n  @@unique([organizationId, caseType, number, regYear, districtCourtId])\n  @@index([organizationId, importStatus], map: \"manualCaseImportTask_organizationId_importStatus_idx\")\n}\n\nmodel CaseImportTask {\n  id              String               @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n  organizationId  String\n  // courtComplexIds json is { complexes: string[] }\n  courtComplexIds Json?\n  advocateId      String\n  caseStatus      String\n  taskStatus      CaseImportTaskStatus @default(PENDING)\n  taskMeta        Json?\n  created_by      String               @db.Uuid\n  created_at      DateTime             @default(now()) @db.Timestamp(6)\n  updatedAt       DateTime?            @db.Timestamptz(6)\n  advocate        OrganizationMembers  @relation(fields: [advocateId, organizationId], references: [memberId, organizationId], onDelete: Cascade, onUpdate: Cascade)\n  organization    Organization         @relation(fields: [organizationId], references: [id], onDelete: Cascade, onUpdate: Cascade, map: \"caseImportTask_organizationId_organization_id_fk\")\n}\n",
  "inlineSchemaHash": "e1b339324627898038c2a681a0bc56c7e35bf956424c9d2b94341869e41523ba",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Account\":{\"dbName\":null,\"fields\":[{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerAccountId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"refresh_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"access_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expires_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"scope\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"id_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"session_state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"AccountToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"provider\",\"providerAccountId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Post\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Session\":{\"dbName\":null,\"fields\":[{\"name\":\"sessionToken\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expires\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"SessionToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"User\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"emailVerified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"account\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Account\",\"relationName\":\"AccountToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"session\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Session\",\"relationName\":\"SessionToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"VerificationToken\":{\"dbName\":null,\"fields\":[{\"name\":\"token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"identifier\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expires\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"identifier\",\"token\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"identifier\",\"token\"]}],\"isGenerated\":false},\"Organization\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"OrganizationMembers\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OrganizationMembers\",\"relationName\":\"OrganizationToOrganizationMembers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Case\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Case\",\"relationName\":\"CaseToOrganization\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"AdvocateCase\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AdvocateCase\",\"relationName\":\"AdvocateCaseToOrganization\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"CaseImportTask\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CaseImportTask\",\"relationName\":\"CaseImportTaskToOrganization\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ManualCaseImportTask\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ManualCaseImportTask\",\"relationName\":\"ManualCaseImportTaskToOrganization\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"OrganizationMembers\":{\"dbName\":null,\"fields\":[{\"name\":\"organizationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"memberId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"OrgRole\",\"default\":\"MEMBER\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"designation\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OrgDesignation\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Organization\",\"relationName\":\"OrganizationToOrganizationMembers\",\"relationFromFields\":[\"organizationId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"AdvocateCase\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AdvocateCase\",\"relationName\":\"AdvocateCaseToOrganizationMembers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"CaseImportTask\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CaseImportTask\",\"relationName\":\"CaseImportTaskToOrganizationMembers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ManualCaseImportTask\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ManualCaseImportTask\",\"relationName\":\"ManualCaseImportTaskToOrganizationMembers\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"organizationId\",\"memberId\"]},\"uniqueFields\":[[\"organizationId\",\"userId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"organizationId\",\"userId\"]}],\"isGenerated\":false},\"Case\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"crn\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courtId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"typeName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"regYear\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"customTitle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"petitioner\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"petitionerLawyers\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"respondent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"respondentLawyers\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dateOfDecision\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nextHearingDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"side\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AdvocateCaseSide\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"extraPetitioners\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"extraRespondents\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"extraParties\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rawData\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"DistrictCourt\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DistrictCourt\",\"relationName\":\"CaseToDistrictCourt\",\"relationFromFields\":[\"courtId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"AdvocateCase\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AdvocateCase\",\"relationName\":\"AdvocateCaseToCase\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Organization\",\"relationName\":\"CaseToOrganization\",\"relationFromFields\":[\"organizationId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ManualCaseImportTask\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ManualCaseImportTask\",\"relationName\":\"CaseToManualCaseImportTask\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"CaseHistory\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CaseHistoryItem\",\"relationName\":\"CaseToCaseHistoryItem\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"organizationId\",\"typeName\",\"number\",\"regYear\",\"courtId\"],[\"organizationId\",\"crn\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"organizationId\",\"typeName\",\"number\",\"regYear\",\"courtId\"]},{\"name\":null,\"fields\":[\"organizationId\",\"crn\"]}],\"isGenerated\":false},\"CaseHistoryItem\":{\"dbName\":null,\"fields\":[{\"name\":\"crn\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"businessOnDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"purposeOfHearing\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hearingDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"case\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Case\",\"relationName\":\"CaseToCaseHistoryItem\",\"relationFromFields\":[\"organizationId\",\"crn\"],\"relationToFields\":[\"organizationId\",\"crn\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"organizationId\",\"crn\",\"businessOnDate\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"AdvocateCase\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"caseId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"advocateId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Case\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Case\",\"relationName\":\"AdvocateCaseToCase\",\"relationFromFields\":[\"caseId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orgMember\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OrganizationMembers\",\"relationName\":\"AdvocateCaseToOrganizationMembers\",\"relationFromFields\":[\"advocateId\",\"organizationId\"],\"relationToFields\":[\"memberId\",\"organizationId\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Organization\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Organization\",\"relationName\":\"AdvocateCaseToOrganization\",\"relationFromFields\":[\"organizationId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"caseId\",\"advocateId\",\"organizationId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"caseId\",\"advocateId\",\"organizationId\"]}],\"isGenerated\":false},\"State\":{\"dbName\":null,\"fields\":[{\"name\":\"stateCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"District\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"District\",\"relationName\":\"DistrictToState\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"District\":{\"dbName\":null,\"fields\":[{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stateCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"districtCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"State\",\"relationName\":\"DistrictToState\",\"relationFromFields\":[\"stateCode\"],\"relationToFields\":[\"stateCode\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"CourtComplex\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CourtComplex\",\"relationName\":\"CourtComplexToDistrict\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"DistrictCourt\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DistrictCourt\",\"relationName\":\"DistrictToDistrictCourt\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"stateCode\",\"districtCode\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CourtComplex\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"complexCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stateCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"districtCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"district\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"District\",\"relationName\":\"CourtComplexToDistrict\",\"relationFromFields\":[\"stateCode\",\"districtCode\"],\"relationToFields\":[\"stateCode\",\"districtCode\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isMasterCourtComplex\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"masterComplexCourtCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"DistrictCourt\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DistrictCourt\",\"relationName\":\"CourtComplexToDistrictCourt\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"CaseType\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CaseType\",\"relationName\":\"CaseTypeToCourtComplex\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ManualCaseImportTask\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ManualCaseImportTask\",\"relationName\":\"CourtComplexToManualCaseImportTask\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"stateCode\",\"districtCode\",\"complexCode\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"stateCode\",\"districtCode\",\"complexCode\"]}],\"isGenerated\":false},\"DistrictCourt\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courtCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"complexId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stateCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"districtCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"district\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"District\",\"relationName\":\"DistrictToDistrictCourt\",\"relationFromFields\":[\"stateCode\",\"districtCode\"],\"relationToFields\":[\"stateCode\",\"districtCode\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"complex\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CourtComplex\",\"relationName\":\"CourtComplexToDistrictCourt\",\"relationFromFields\":[\"complexId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cases\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Case\",\"relationName\":\"CaseToDistrictCourt\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ManualCaseImportTask\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ManualCaseImportTask\",\"relationName\":\"DistrictCourtToManualCaseImportTask\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"stateCode\",\"districtCode\",\"courtCode\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"stateCode\",\"districtCode\",\"courtCode\"]}],\"isGenerated\":false},\"CaseType\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"label\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"complexId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ManualCaseImportTask\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ManualCaseImportTask\",\"relationName\":\"CaseTypeToManualCaseImportTask\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Complex\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CourtComplex\",\"relationName\":\"CaseTypeToCourtComplex\",\"relationFromFields\":[\"complexId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"complexId\",\"code\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"complexId\",\"code\"]}],\"isGenerated\":false},\"ManualCaseImportTask\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"caseType\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"regYear\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"CaseType\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CaseType\",\"relationName\":\"CaseTypeToManualCaseImportTask\",\"relationFromFields\":[\"complexId\",\"caseType\"],\"relationToFields\":[\"complexId\",\"code\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"districtCourtId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"districtCourt\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DistrictCourt\",\"relationName\":\"DistrictCourtToManualCaseImportTask\",\"relationFromFields\":[\"districtCourtId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"complexId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"complex\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CourtComplex\",\"relationName\":\"CourtComplexToManualCaseImportTask\",\"relationFromFields\":[\"complexId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"importStatus\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"CaseImportTaskStatus\",\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"caseId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"case\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Case\",\"relationName\":\"CaseToManualCaseImportTask\",\"relationFromFields\":[\"caseId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdBy\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creator\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OrganizationMembers\",\"relationName\":\"ManualCaseImportTaskToOrganizationMembers\",\"relationFromFields\":[\"createdBy\",\"organizationId\"],\"relationToFields\":[\"memberId\",\"organizationId\"],\"relationOnDelete\":\"NoAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"response\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Organization\",\"relationName\":\"ManualCaseImportTaskToOrganization\",\"relationFromFields\":[\"organizationId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"organizationId\",\"caseType\",\"number\",\"regYear\",\"districtCourtId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"organizationId\",\"caseType\",\"number\",\"regYear\",\"districtCourtId\"]}],\"isGenerated\":false},\"CaseImportTask\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"gen_random_uuid()\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organizationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courtComplexIds\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"advocateId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"caseStatus\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"taskStatus\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"CaseImportTaskStatus\",\"default\":\"PENDING\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"taskMeta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_by\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"advocate\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OrganizationMembers\",\"relationName\":\"CaseImportTaskToOrganizationMembers\",\"relationFromFields\":[\"advocateId\",\"organizationId\"],\"relationToFields\":[\"memberId\",\"organizationId\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"organization\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Organization\",\"relationName\":\"CaseImportTaskToOrganization\",\"relationFromFields\":[\"organizationId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"OrgDesignation\":{\"values\":[{\"name\":\"ADVOCATE\",\"dbName\":null},{\"name\":\"STAFF\",\"dbName\":null}],\"dbName\":null},\"OrgRole\":{\"values\":[{\"name\":\"OWNER\",\"dbName\":null},{\"name\":\"ADMIN\",\"dbName\":null},{\"name\":\"MEMBER\",\"dbName\":null}],\"dbName\":null},\"AdvocateCaseSide\":{\"values\":[{\"name\":\"PETITIONER\",\"dbName\":null},{\"name\":\"RESPONDENT\",\"dbName\":null},{\"name\":\"UNKNOWN\",\"dbName\":null}],\"dbName\":null},\"CaseImportTaskStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"IN_PROGRESS\",\"dbName\":null},{\"name\":\"COMPLETED\",\"dbName\":null},{\"name\":\"FAILED\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

