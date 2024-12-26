/**
 * Client-safe utilities for path manipulation
 */
export const getOrgDashboardPath = (orgSlug: string) => {
  return `/x/${orgSlug}`;
};
