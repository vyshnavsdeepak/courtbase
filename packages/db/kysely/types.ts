import type { ColumnType } from "kysely";

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Account {
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
}
export interface Case {
  id: Generated<string>;
  crn: string;
  title: string;
  description: string;
  created_at: Generated<Timestamp>;
  updatedAt: Timestamp | null;
  organizationId: string;
}
export interface Organization {
  id: Generated<string>;
  name: string;
  slug: string;
}
export interface OrganizationMembers {
  organizationId: string;
  userId: string;
  role: string;
}
export interface Post {
  id: Generated<string>;
  title: string;
  content: string;
  created_at: Generated<Timestamp>;
  updatedAt: Timestamp | null;
}
export interface Session {
  sessionToken: string;
  userId: string;
  expires: Timestamp;
}
export interface User {
  id: Generated<string>;
  name: string | null;
  email: string;
  emailVerified: Timestamp | null;
  image: string | null;
}
export interface VerificationToken {
  token: string;
  identifier: string;
  expires: Timestamp;
}
export interface DB {
  Account: Account;
  Case: Case;
  Organization: Organization;
  OrganizationMembers: OrganizationMembers;
  Post: Post;
  Session: Session;
  User: User;
  VerificationToken: VerificationToken;
}
