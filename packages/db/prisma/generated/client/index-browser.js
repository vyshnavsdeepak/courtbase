
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('./runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
