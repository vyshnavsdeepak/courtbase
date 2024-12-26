
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


exports.Prisma.ModelName = {

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
  "inlineSchema": "datasource db {\n  provider  = \"postgresql\"\n  url       = env(\"DATABASE_URL\")\n  directUrl = env(\"DIRECT_URL\")\n}\n\ngenerator client {\n  provider      = \"prisma-client-js\"\n  output        = \"./generated/client\"\n  binaryTargets = \"native\"\n}\n\ngenerator kysely {\n  provider     = \"prisma-kysely\"\n  output       = \"../kysely\"\n  fileName     = \"types.ts\"\n  enumFileName = \"enums.ts\"\n}\n\ngenerator zod {\n  provider                         = \"zod-prisma-types\"\n  output                           = \"../src/models\" // default is ./generated/zod\n  useMultipleFiles                 = false // default is false\n  writeBarrelFiles                 = false // default is true\n  createInputTypes                 = false // default is true\n  createModelTypes                 = true // default is true\n  addInputTypeValidation           = false // default is true\n  addIncludeType                   = false // default is true\n  addSelectType                    = false // default is true\n  validateWhereUniqueInput         = true // default is true\n  createOptionalDefaultValuesTypes = false // default is false\n  createRelationValuesTypes        = true // default is false\n  createPartialTypes               = false // default is false\n  useDefaultValidators             = false // default is true\n  coerceDate                       = true // default is true\n  writeNullishInModelTypes         = true // default is false\n  prismaClientPath                 = \"../../prisma/generated/client\"\n}\n\n// generator zod {\n//   provider         = \"zod-prisma\"\n//   output           = \"../src/models\" // default is ./generated/zod\n//   relationModel    = false // Disable relation models which require Prisma Client\n//   prismaClientPath = \"\" // Leave empty to avoid Prisma Client dependency\n//   useMultipleFiles = true // Generate separate files for each model\n//   createInputTypes = false // Disable input types that depend on Prisma Client\n//   createModelTypes = true // Generate basic model types only\n// }\n\n// generator zod {\n//   provider = \"zod-prisma\"\n//   output   = \"../src/models\"\n// }\n\n// model Account {\n//   userId            String  @db.Uuid\n//   type              String  @db.VarChar(255)\n//   provider          String  @db.VarChar(255)\n//   providerAccountId String  @db.VarChar(255)\n//   refresh_token     String? @db.VarChar(255)\n//   access_token      String?\n//   expires_at        Int?\n//   token_type        String? @db.VarChar(255)\n//   scope             String? @db.VarChar(255)\n//   id_token          String?\n//   session_state     String? @db.VarChar(255)\n//   user              User    @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: \"account_userId_user_id_fk\")\n\n//   @@id([provider, providerAccountId], map: \"account_provider_providerAccountId_pk\")\n// }\n\n// model Post {\n//   id         String    @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n//   title      String    @db.VarChar(256)\n//   content    String\n//   created_at DateTime  @default(now()) @db.Timestamp(6)\n//   updatedAt  DateTime? @db.Timestamptz(6)\n// }\n\n// model Session {\n//   sessionToken String   @id @db.VarChar(255)\n//   userId       String   @db.Uuid\n//   expires      DateTime @db.Timestamptz(6)\n//   user         User     @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: \"session_userId_user_id_fk\")\n// }\n\n// model User {\n//   id            String    @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n//   name          String?   @db.VarChar(255)\n//   email         String    @db.VarChar(255)\n//   emailVerified DateTime? @db.Timestamptz(6)\n//   image         String?   @db.VarChar(255)\n//   account       Account[]\n//   session       Session[]\n// }\n\n// model VerificationToken {\n//   token      String   @id @db.VarChar(255)\n//   identifier String   @db.VarChar(255)\n//   expires    DateTime @db.Timestamptz(6)\n\n//   @@unique([identifier, token], map: \"verificationToken_identifier_token_unique\")\n// }\n\n// model Organization {\n//   id                  String                @id\n//   name                String                @db.VarChar(255)\n//   OrganizationMembers OrganizationMembers[]\n//   Case                Case[]\n//   AdvocateCase        AdvocateCase[]\n//   CaseImportTask      CaseImportTask[]\n\n//   ManualCaseImportTask ManualCaseImportTask[] @relation(map: \"manualCaseImportTask_organizationId_organization_id_fk\")\n// }\n\n// enum OrgDesignation {\n//   ADVOCATE\n//   STAFF\n// }\n\n// enum OrgRole {\n//   OWNER\n//   ADMIN\n//   MEMBER\n// }\n\n// model OrganizationMembers {\n//   organizationId String\n//   userId         String          @db.Uuid\n//   memberId       String          @db.VarChar(255) // human readable slug based on name - unique in organization\n//   role           OrgRole         @default(MEMBER)\n//   designation    OrgDesignation?\n\n//   organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade, onUpdate: Cascade, map: \"organizationMembers_organizationId_organization_id_fk\")\n\n//   // Only OrgDesignation.ADVOCATE will have AdvocateCase and CaseImportTask\n//   AdvocateCase         AdvocateCase[]\n//   CaseImportTask       CaseImportTask[]\n//   ManualCaseImportTask ManualCaseImportTask[]\n\n//   @@id([organizationId, memberId], map: \"organizationMembers_organizationId_memberId_pk\")\n//   @@unique([organizationId, userId], map: \"organizationMembers_organizationId_userId_unique\")\n//   @@index([organizationId, designation], map: \"organizationMembers_organizationId_designation_idx\")\n// }\n\n// enum AdvocateCaseSide {\n//   PETITIONER\n//   RESPONDENT\n//   UNKNOWN\n// }\n\n// model Case {\n//   id                String    @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n//   crn               String    @db.VarChar(16)\n//   courtId           String\n//   typeName          String    @db.VarChar(50) // eg. OP, OS, CC, MC\n//   number            String    @db.VarChar(10) // eg. 232\n//   regYear           String    @db.VarChar(4) // eg. 2021\n//   // typeName/number/regYear is unique in a court = eg. OP/232/2021\n//   title             String    @db.VarChar(255)\n//   customTitle       String?   @db.VarChar(255)\n//   description       String?   @db.VarChar(255)\n//   petitioner        String    @db.VarChar(255)\n//   petitionerLawyers String    @db.VarChar(255)\n//   respondent        String    @db.VarChar(255)\n//   respondentLawyers String?   @db.VarChar(255)\n//   dateOfDecision    DateTime? @db.Date\n//   nextHearingDate   DateTime? @db.Date\n\n//   // side - petitioner/respondent\n//   side             AdvocateCaseSide\n//   extraPetitioners String?          @db.VarChar(255)\n//   extraRespondents String?          @db.VarChar(255)\n//   extraParties     String?          @db.VarChar(255)\n\n//   rawData    Json      @db.Json\n//   created_at DateTime  @default(now()) @db.Timestamp(6)\n//   updatedAt  DateTime? @db.Timestamptz(6)\n\n//   organizationId String\n\n//   DistrictCourt DistrictCourt  @relation(fields: [courtId], references: [id], onDelete: NoAction, onUpdate: Cascade, map: \"eCourtCase_courtId_districtcourt_id_fk\")\n//   AdvocateCase  AdvocateCase[] @relation(map: \"advocateCase_caseId_case_id_fk\")\n\n//   organization         Organization           @relation(fields: [organizationId], references: [id], onDelete: Cascade, onUpdate: Cascade, map: \"case_organizationId_organization_id_fk\")\n//   ManualCaseImportTask ManualCaseImportTask[]\n//   CaseHistory          CaseHistoryItem[]\n\n//   // to lookup case by case number of type OP/232/2021, we need to have a unique constraint on typeName, caseNo, caseRegYear per court per organization\n//   @@unique([organizationId, typeName, number, regYear, courtId], map: \"case_organization_typeName_number_regYear_courtId_unique\")\n//   @@unique([organizationId, crn], map: \"case_organization_organization_id_fk\")\n// }\n\n// model CaseHistoryItem {\n//   crn              String    @db.VarChar(16)\n//   businessOnDate   DateTime  @db.Date\n//   purposeOfHearing String    @db.VarChar(50)\n//   hearingDate      DateTime? @db.Date\n//   notes            String?   @db.VarChar(255)\n//   organizationId   String\n//   case             Case      @relation(fields: [organizationId, crn], references: [organizationId, crn], onDelete: Cascade, onUpdate: NoAction)\n\n//   @@id([organizationId, crn, businessOnDate])\n// }\n\n// model AdvocateCase {\n//   id             String    @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n//   caseId         String    @db.Uuid\n//   advocateId     String\n//   organizationId String\n//   createdAt      DateTime  @default(now()) @db.Timestamp(6)\n//   updatedAt      DateTime? @db.Timestamptz(6)\n\n//   Case         Case                @relation(fields: [caseId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: \"advocateCase_caseId_case_id_fk\")\n//   orgMember    OrganizationMembers @relation(fields: [advocateId, organizationId], references: [memberId, organizationId], onDelete: Cascade, onUpdate: Cascade)\n//   Organization Organization        @relation(fields: [organizationId], references: [id])\n\n//   @@unique([caseId, advocateId, organizationId], map: \"advocateCase_caseId_advocateId_organizationId_unique\")\n// }\n\n// model State {\n//   stateCode String     @id @db.VarChar(2) // State code is unique to India\n//   name      String     @db.VarChar(255)\n//   District  District[]\n// }\n\n// model District {\n//   name          String          @db.VarChar(255)\n//   stateCode     String          @db.VarChar(2)\n//   districtCode  String          @db.VarChar(2) // this districtCode is unique in state only, thus having a composite key with stateCode\n//   state         State           @relation(fields: [stateCode], references: [stateCode], onDelete: NoAction, onUpdate: NoAction, map: \"district_state_stateCode_fk\")\n//   CourtComplex  CourtComplex[]\n//   DistrictCourt DistrictCourt[] @relation(map: \"court_district_stateCode_districtCode_fk\")\n\n//   @@id([stateCode, districtCode], map: \"district_stateCode_districtCode_pk\")\n// }\n\n// model CourtComplex {\n//   id                     String                 @id\n//   name                   String                 @db.VarChar(255)\n//   complexCode            String?                @db.VarChar(30)\n//   stateCode              String\n//   districtCode           String\n//   district               District               @relation(fields: [stateCode, districtCode], references: [stateCode, districtCode], onDelete: NoAction, onUpdate: NoAction, map: \"courtComplex_stateCode_districtCode_fk\")\n//   isMasterCourtComplex   Boolean                @default(false)\n//   masterComplexCourtCode String?                @db.VarChar(3)\n//   created_at             DateTime               @default(now()) @db.Timestamp(6)\n//   updatedAt              DateTime?              @db.Timestamptz(6)\n//   DistrictCourt          DistrictCourt[]        @relation(map: \"court_complexId_courtComplex_id_fk\")\n//   CaseType               CaseType[]\n//   ManualCaseImportTask   ManualCaseImportTask[]\n\n//   @@unique([stateCode, districtCode, complexCode], map: \"courtComplex_stateCode_districtCode_complexCode_unique\")\n// }\n\n// model DistrictCourt {\n//   id                   String                 @id\n//   courtCode            String                 @db.VarChar(3) // court code is unique in a district\n//   name                 String                 @db.VarChar(255)\n//   complexId            String\n//   stateCode            String                 @db.VarChar(2)\n//   districtCode         String                 @db.VarChar(2)\n//   district             District               @relation(fields: [stateCode, districtCode], references: [stateCode, districtCode], onDelete: NoAction, onUpdate: NoAction, map: \"court_district_stateCode_districtCode_fk\")\n//   complex              CourtComplex           @relation(fields: [complexId], references: [id], onDelete: NoAction, onUpdate: Cascade, map: \"court_complexId_courtComplex_id_fk\")\n//   cases                Case[]                 @relation(map: \"Case_courtId_court_id_fk\")\n//   ManualCaseImportTask ManualCaseImportTask[] @relation(map: \"manualCaseImportTask_districtCourtId_districtcourt_id_fk\")\n\n//   @@unique([stateCode, districtCode, courtCode], map: \"districtcourt_stateCode_districtCode_courtCode_unique\")\n// }\n\n// model CaseType {\n//   id                   String                 @id\n//   label                String                 @db.VarChar(255)\n//   code                 String                 @db.VarChar(50)\n//   complexId            String\n//   ManualCaseImportTask ManualCaseImportTask[]\n//   Complex              CourtComplex           @relation(fields: [complexId], references: [id], onDelete: NoAction, onUpdate: Cascade)\n\n//   @@unique([complexId, code])\n// }\n\n// enum CaseImportTaskStatus {\n//   PENDING\n//   IN_PROGRESS\n//   COMPLETED\n//   FAILED\n// }\n\n// model ManualCaseImportTask {\n//   id              String        @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n//   // typeName is eg. OP, OS, CC; should be infered from caseTypeCode\n//   caseType        String // eg. 47\n//   number          String        @db.VarChar(10) // eg. 232\n//   regYear         String        @db.VarChar(4) // eg. 2021\n//   CaseType        CaseType      @relation(fields: [complexId, caseType], references: [complexId, code], onDelete: NoAction, onUpdate: Cascade)\n//   // typeName/number/regYear is unique in a court = eg. OP/232/2021\n//   districtCourtId String\n//   districtCourt   DistrictCourt @relation(fields: [districtCourtId], references: [id], onDelete: Cascade, onUpdate: Cascade, map: \"manualCaseImportTask_districtCourtId_districtcourt_id_fk\")\n//   complexId       String\n//   // Note: Complex id was introduced only for relation to CaseTypes using code and CaseType\n//   // Now, complex id is the only way to get courtCode if court selected is a masterComplex\n//   complex         CourtComplex  @relation(fields: [complexId], references: [id], onDelete: NoAction, onUpdate: Cascade)\n\n//   importStatus CaseImportTaskStatus @default(PENDING)\n\n//   caseId String? @db.Uuid\n//   case   Case?   @relation(fields: [caseId], references: [id], onDelete: NoAction, onUpdate: Cascade)\n\n//   createdBy String\n//   creator   OrganizationMembers @relation(fields: [createdBy, organizationId], references: [memberId, organizationId], onDelete: NoAction, onUpdate: Cascade)\n\n//   response Json?\n\n//   createdAt DateTime  @default(now()) @db.Timestamp(6)\n//   updatedAt DateTime? @db.Timestamptz(6)\n\n//   organizationId String\n//   organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade, onUpdate: Cascade, map: \"manualCaseImportTask_organizationId_organization_id_fk\")\n\n//   @@unique([organizationId, caseType, number, regYear, districtCourtId])\n//   @@index([organizationId, importStatus], map: \"manualCaseImportTask_organizationId_importStatus_idx\")\n// }\n\n// model CaseImportTask {\n//   id              String               @id @default(dbgenerated(\"gen_random_uuid()\")) @db.Uuid\n//   organizationId  String\n//   // courtComplexIds json is { complexes: string[] }\n//   courtComplexIds Json?\n//   advocateId      String\n//   caseStatus      String\n//   taskStatus      CaseImportTaskStatus @default(PENDING)\n//   taskMeta        Json?\n//   created_by      String               @db.Uuid\n//   created_at      DateTime             @default(now()) @db.Timestamp(6)\n//   updatedAt       DateTime?            @db.Timestamptz(6)\n//   advocate        OrganizationMembers  @relation(fields: [advocateId, organizationId], references: [memberId, organizationId], onDelete: Cascade, onUpdate: Cascade)\n//   organization    Organization         @relation(fields: [organizationId], references: [id], onDelete: Cascade, onUpdate: Cascade, map: \"caseImportTask_organizationId_organization_id_fk\")\n// }\n",
  "inlineSchemaHash": "a6078ce6848eec3c5ee49f9c79ea2101c616a157982d21d41a2cbcf8f71bde50",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{},\"enums\":{},\"types\":{}}")
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

