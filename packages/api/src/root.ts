import { authRouter } from "./router/auth";
import { caseImportRouter } from "./router/case-import";
import { casesRouter } from "./router/cases";
import { courtRouter } from "./router/court";
import { organizationRouter } from "./router/organization";
import { organizationInviteRouter } from "./router/organization-invite";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  organization: organizationRouter,
  organizationInvite: organizationInviteRouter,
  court: courtRouter,
  cases: casesRouter,
  caseImport: caseImportRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
