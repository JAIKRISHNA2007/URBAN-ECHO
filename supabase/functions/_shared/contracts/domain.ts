import { z } from 'zod';

export const roles = ['resident', 'staff', 'admin'] as const;
export const categories = [
  'roads',
  'streetlights',
  'waste',
  'water_supply',
  'drainage',
  'other',
] as const;
export const statuses = [
  'received',
  'under_review',
  'assigned',
  'in_progress',
  'resolved',
  'reopened',
  'referred',
  'rejected',
  'merged',
] as const;
export const priorities = ['low', 'medium', 'high', 'urgent'] as const;
export const aiStatuses = [
  'pending',
  'processing',
  'completed',
  'failed',
  'disabled',
] as const;
export const visibilities = ['anonymous', 'named'] as const;
export const sourceLanguages = ['en', 'ta', 'und'] as const;

export const roleSchema = z.enum(roles);
export const categorySchema = z.enum(categories);
export const statusSchema = z.enum(statuses);
export const prioritySchema = z.enum(priorities);
export const severitySchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);
export const aiStatusSchema = z.enum(aiStatuses);
export const visibilitySchema = z.enum(visibilities);
export const sourceLanguageSchema = z.enum(sourceLanguages);
export const preferredLanguageSchema = z.enum(['en', 'ta']);
export const uuidSchema = z.string().uuid();
export const isoDateTimeSchema = z.string().datetime({ offset: true });
export const reportReferenceSchema = z.string().regex(/^R-[A-F0-9]{12}$/);
export const issueReferenceSchema = z.string().regex(/^I-[A-F0-9]{12}$/);

export const locationSchema = z
  .object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    accuracy_m: z.number().nonnegative().nullable(),
    source: z.enum(['gps', 'manual']),
    landmark: z.string().trim().min(1).nullable(),
  })
  .strict();

export const issueSummarySchema = z
  .object({
    issue_id: uuidSchema,
    reference: issueReferenceSchema,
    category: categorySchema,
    title: z.string(),
    status: statusSchema,
    priority: prioritySchema,
    report_count: z.number().int().nonnegative(),
    vote_count: z.number().int().nonnegative(),
    supported_by_me: z.boolean(),
    overdue: z.boolean(),
    created_at: isoDateTimeSchema,
    updated_at: isoDateTimeSchema,
    approximate_location: z
      .object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
      })
      .strict()
      .nullable(),
    version: z.number().int().positive(),
  })
  .strict();

export const ownReportSchema = z
  .object({
    report_id: uuidSchema,
    reference: reportReferenceSchema,
    issue: issueSummarySchema,
    ai_status: aiStatusSchema,
    description: z.string().max(1000),
    visibility: visibilitySchema,
    location: locationSchema,
    media_ids: z.array(uuidSchema).max(3),
    created_at: isoDateTimeSchema,
  })
  .strict();

export const eventSchema = z
  .object({
    id: uuidSchema,
    kind: z.string(),
    from_status: statusSchema.nullable(),
    to_status: statusSchema.nullable(),
    public_note: z.string().nullable(),
    created_at: isoDateTimeSchema,
  })
  .strict();

export const candidateSchema = z
  .object({
    candidate_issue_id: uuidSchema,
    candidate_report_id: uuidSchema,
    distance_m: z.number().nonnegative(),
    text_similarity: z.number().min(0).max(1).nullable(),
    image_similarity: z.number().min(0).max(1).nullable(),
    score: z.number().min(0).max(1),
    decision: z.enum(['pending', 'accepted', 'rejected']),
  })
  .strict();

export const aiResultSchema = z
  .object({
    report_id: uuidSchema,
    ai_status: aiStatusSchema,
    category_suggestion: categorySchema.nullable(),
    severity_suggestion: severitySchema.nullable(),
    explanation: z.string().max(300),
    review_flags: z.array(z.string()),
    suggested_priority: prioritySchema,
    priority_score: z.number().min(0).max(100),
    model_id: z.string(),
    processed_at: isoDateTimeSchema.nullable(),
  })
  .strict();

export const feedbackSchema = z
  .object({
    id: uuidSchema,
    resolution_id: uuidSchema,
    rating: z.number().int().min(1).max(5).nullable(),
    decision: z.enum(['confirmed', 'reopen_requested']),
    comment: z.string().nullable(),
    review_state: z.enum(['pending', 'accepted', 'rejected']),
    created_at: isoDateTimeSchema,
  })
  .strict();

export const meSchema = z
  .object({
    user_id: uuidSchema,
    display_name: z.string(),
    role: roleSchema.nullable(),
    village_id: uuidSchema.nullable(),
    village_name: z.string().nullable(),
    language: preferredLanguageSchema,
  })
  .strict();

export const routingRuleSchema = z
  .object({
    category: categorySchema,
    team_id: uuidSchema.nullable(),
    acknowledgement_hours: z.number().positive(),
    resolution_hours: z.number().positive(),
    escalation_role: z.literal('admin'),
  })
  .strict();

export const notificationSchema = z
  .object({
    id: uuidSchema,
    kind: z.string(),
    message_key: z.string(),
    safe_params: z.record(z.string(), z.unknown()),
    issue_id: uuidSchema.nullable(),
    read_at: isoDateTimeSchema.nullable(),
    created_at: isoDateTimeSchema,
  })
  .strict();

export const pageSchema = <T extends z.ZodType>(itemSchema: T) =>
  z
    .object({
      items: z.array(itemSchema),
      next_cursor: z.string().nullable(),
    })
    .strict();

export type Role = z.infer<typeof roleSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Status = z.infer<typeof statusSchema>;
export type Priority = z.infer<typeof prioritySchema>;
export type Severity = z.infer<typeof severitySchema>;
export type AiStatus = z.infer<typeof aiStatusSchema>;
export type Visibility = z.infer<typeof visibilitySchema>;
export type SourceLanguage = z.infer<typeof sourceLanguageSchema>;
export type Location = z.infer<typeof locationSchema>;
export type IssueSummary = z.infer<typeof issueSummarySchema>;
export type OwnReport = z.infer<typeof ownReportSchema>;
export type Event = z.infer<typeof eventSchema>;
export type Candidate = z.infer<typeof candidateSchema>;
export type AiResult = z.infer<typeof aiResultSchema>;
export type Feedback = z.infer<typeof feedbackSchema>;
export type Me = z.infer<typeof meSchema>;
export type RoutingRule = z.infer<typeof routingRuleSchema>;
export type Notification = z.infer<typeof notificationSchema>;
export type Page<T> = { items: T[]; next_cursor: string | null };
