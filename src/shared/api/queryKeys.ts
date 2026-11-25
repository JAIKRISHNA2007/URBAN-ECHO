export const queryKeys = {
  me: ['me'] as const,
  feed: (filters: object) => ['feed', filters] as const,
  issue: (issueId: string) => ['issue', issueId] as const,
  myReports: ['my-reports'] as const,
  adminIssues: (filters: object) => ['admin-issues', filters] as const,
  notifications: ['notifications'] as const,
} as const;
