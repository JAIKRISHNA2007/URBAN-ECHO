import { z } from 'zod';

import {
  aiResultSchema,
  categorySchema,
  candidateSchema,
  eventSchema,
  feedbackSchema,
  isoDateTimeSchema,
  issueSummarySchema,
  locationSchema,
  meSchema,
  notificationSchema,
  ownReportSchema,
  pageSchema,
  preferredLanguageSchema,
  prioritySchema,
  roleSchema,
  routingRuleSchema,
  severitySchema,
  sourceLanguageSchema,
  statusSchema,
  uuidSchema,
  visibilitySchema,
} from './domain';

const emptyPayloadSchema = z.object({}).strict();
const paginationFields = {
  cursor: z.string().min(1).optional(),
  limit: z.number().int().min(1).max(50).optional(),
};
const optionalTextSchema = z.string().trim().min(1).optional();
const requiredTextSchema = z.string().trim().min(1);
const expectedVersionSchema = z.number().int().positive();

export const apiErrorSchema = z
  .object({
    code: z.string(),
    message_key: z.string(),
    retryable: z.boolean(),
    field_errors: z.record(z.string(), z.string()).optional(),
  })
  .strict();

export const resultSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.discriminatedUnion('ok', [
    z
      .object({
        ok: z.literal(true),
        data: dataSchema,
        request_id: uuidSchema,
      })
      .strict(),
    z
      .object({
        ok: z.literal(false),
        error: apiErrorSchema,
        request_id: uuidSchema,
      })
      .strict(),
  ]);

const reportCreatePayloadSchema = z
  .object({
    category: categorySchema,
    description: z.string().trim().max(1000),
    location: locationSchema,
    visibility: visibilitySchema,
    media_ids: z.array(uuidSchema).max(3),
    user_severity: severitySchema.nullable(),
    ai_consent: z.boolean(),
    source_language: sourceLanguageSchema,
  })
  .strict()
  .superRefine((value, context) => {
    if (value.media_ids.length === 0 && value.description.length < 10) {
      context.addIssue({
        code: 'custom',
        message: 'A text-only report requires at least 10 characters.',
        path: ['description'],
      });
    }
  });

const reportReceiptSchema = z
  .object({
    report_id: uuidSchema,
    reference: z.string().regex(/^R-[A-F0-9]{12}$/),
    issue_id: uuidSchema,
    issue_reference: z.string().regex(/^I-[A-F0-9]{12}$/),
    status: z.literal('received'),
    ai_status: z.enum([
      'pending',
      'processing',
      'completed',
      'failed',
      'disabled',
    ]),
  })
  .strict();

const uploadReservationSchema = z
  .object({
    media_id: uuidSchema,
    storage_path: z.string().min(1),
    upload_token: z.string().min(1),
    expires_at: isoDateTimeSchema,
  })
  .strict();

const teamSchema = z
  .object({
    id: uuidSchema,
    name_en: z.string(),
    name_ta: z.string(),
    active: z.boolean(),
  })
  .strict();

const workflowResultSchema = z
  .object({
    issue_id: uuidSchema,
    version: expectedVersionSchema,
    status: statusSchema,
  })
  .strict();

const internalEventSchema = eventSchema.extend({
  internal_note: z.string().nullable(),
});

const adminReportSchema = ownReportSchema.extend({
  reporter_display_name: z.string().optional(),
});

const action = <P extends z.ZodType, D extends z.ZodType>(
  payload: P,
  data: D,
) => ({ payload, data });

export const actionContracts = {
  me: action(emptyPayloadSchema, meSchema),
  join_village: action(
    z
      .object({
        enrollment_code: requiredTextSchema,
        display_name: requiredTextSchema,
        language: preferredLanguageSchema,
      })
      .strict(),
    meSchema,
  ),
  profile_update: action(
    z
      .object({
        display_name: requiredTextSchema.optional(),
        language: preferredLanguageSchema.optional(),
      })
      .strict(),
    meSchema,
  ),
  upload_reserve: action(
    z
      .object({
        purpose: z.enum(['report', 'resolution']),
        mime_type: z.enum(['image/jpeg', 'image/png', 'image/webp']),
        byte_size: z
          .number()
          .int()
          .positive()
          .max(5 * 1024 * 1024),
      })
      .strict(),
    uploadReservationSchema,
  ),
  report_create: action(reportCreatePayloadSchema, reportReceiptSchema),
  feed_list: action(
    z
      .object({
        category: categorySchema.optional(),
        status: statusSchema.optional(),
        ...paginationFields,
      })
      .strict(),
    pageSchema(issueSummarySchema),
  ),
  issue_get: action(
    z.object({ issue_id: uuidSchema }).strict(),
    z
      .object({
        issue: issueSummarySchema,
        public_summary: z.string().nullable(),
        timeline: z.array(eventSchema),
        resolution_summary: z.string().nullable(),
      })
      .strict(),
  ),
  my_reports: action(
    z.object({ ...paginationFields }).strict(),
    pageSchema(ownReportSchema),
  ),
  my_report_get: action(
    z.object({ report_id: uuidSchema }).strict(),
    z
      .object({
        report: ownReportSchema,
        timeline: z.array(eventSchema),
        resolution: z
          .object({
            id: uuidSchema,
            summary: z.string(),
            media_ids: z.array(uuidSchema),
          })
          .strict()
          .nullable(),
      })
      .strict(),
  ),
  vote_set: action(
    z.object({ issue_id: uuidSchema, supported: z.boolean() }).strict(),
    z
      .object({
        issue_id: uuidSchema,
        supported_by_me: z.boolean(),
        vote_count: z.number().int().nonnegative(),
      })
      .strict(),
  ),
  media_read: action(
    z.object({ media_id: uuidSchema }).strict(),
    z.object({ url: z.url(), expires_at: isoDateTimeSchema }).strict(),
  ),
  feedback_create: action(
    z
      .object({
        issue_id: uuidSchema,
        resolution_id: uuidSchema,
        decision: z.enum(['confirmed', 'reopen_requested']),
        rating: z.number().int().min(1).max(5).nullable(),
        comment: z.string().nullable(),
      })
      .strict(),
    z
      .object({
        feedback_id: uuidSchema,
        review_state: z.enum(['pending', 'accepted', 'rejected']),
      })
      .strict(),
  ),
  notifications_list: action(
    z.object({ ...paginationFields }).strict(),
    pageSchema(notificationSchema),
  ),
  notification_read: action(
    z.object({ notification_id: uuidSchema }).strict(),
    z.object({ id: uuidSchema, read_at: isoDateTimeSchema }).strict(),
  ),
  voice_transcribe: action(
    z
      .object({
        audio_base64: z.string().min(1),
        mime_type: z.string().min(1),
        language_hint: z.enum(['en', 'ta', 'auto']),
      })
      .strict(),
    z
      .object({
        text: z.string(),
        language: sourceLanguageSchema,
      })
      .strict(),
  ),
  rewards_get: action(
    emptyPayloadSchema,
    z
      .object({
        points: z.number().int(),
        badges: z.array(z.string()),
        history: pageSchema(
          z
            .object({
              points: z.number().int(),
              reason: z.string(),
              created_at: isoDateTimeSchema,
            })
            .strict(),
        ),
      })
      .strict(),
  ),
  push_register: action(
    z.object({ token_or_fid: requiredTextSchema }).strict(),
    z.object({ enabled: z.literal(true) }).strict(),
  ),
  push_unregister: action(
    z.object({ token_or_fid: requiredTextSchema }).strict(),
    z.object({ enabled: z.literal(false) }).strict(),
  ),
  admin_issues: action(
    z
      .object({
        category: categorySchema.optional(),
        status: statusSchema.optional(),
        priority: prioritySchema.optional(),
        overdue: z.boolean().optional(),
        ...paginationFields,
      })
      .strict(),
    pageSchema(issueSummarySchema),
  ),
  admin_issue_get: action(
    z.object({ issue_id: uuidSchema }).strict(),
    z
      .object({
        issue: issueSummarySchema,
        exact_location: locationSchema,
        public_visible: z.boolean(),
        public_summary: z.string().nullable(),
        assigned_team_id: uuidSchema.nullable(),
        assigned_user_id: uuidSchema.nullable(),
        ack_due_at: isoDateTimeSchema.nullable(),
        resolution_due_at: isoDateTimeSchema.nullable(),
        official_priority: prioritySchema.nullable(),
        suggested_priority: prioritySchema,
        priority_score: z.number().min(0).max(100),
        verified_severity: severitySchema.nullable(),
        reports: z.array(adminReportSchema),
        ai_results: z.array(aiResultSchema),
        candidates: z.array(candidateSchema),
        events: z.array(internalEventSchema),
        feedback: z.array(feedbackSchema),
      })
      .strict(),
  ),
  admin_review: action(
    z
      .object({
        issue_id: uuidSchema,
        expected_version: expectedVersionSchema,
        category: categorySchema,
        public_summary: z.string().nullable(),
        public_visible: z.boolean(),
        verified_severity: severitySchema.nullable(),
        official_priority: prioritySchema.nullable(),
        reason: requiredTextSchema,
        internal_note: optionalTextSchema,
      })
      .strict(),
    workflowResultSchema,
  ),
  admin_assign: action(
    z
      .object({
        issue_id: uuidSchema,
        expected_version: expectedVersionSchema,
        team_id: uuidSchema,
        user_id: uuidSchema.nullable(),
        public_note: optionalTextSchema,
        internal_note: optionalTextSchema,
      })
      .strict(),
    workflowResultSchema,
  ),
  admin_transition: action(
    z
      .object({
        issue_id: uuidSchema,
        expected_version: expectedVersionSchema,
        to_status: statusSchema,
        reason: requiredTextSchema,
        public_note: optionalTextSchema,
        internal_note: optionalTextSchema,
        referral_details: z.string().nullable().optional(),
      })
      .strict(),
    workflowResultSchema,
  ),
  admin_resolve: action(
    z
      .object({
        issue_id: uuidSchema,
        expected_version: expectedVersionSchema,
        action_summary: requiredTextSchema,
        media_ids: z.array(uuidSchema),
        exception_reason: optionalTextSchema,
      })
      .strict(),
    workflowResultSchema.extend({ resolution_id: uuidSchema }),
  ),
  admin_duplicate_decide: action(
    z
      .object({
        report_id: uuidSchema,
        candidate_issue_id: uuidSchema,
        decision: z.enum(['accepted', 'rejected']),
        source_expected_version: expectedVersionSchema,
        target_expected_version: expectedVersionSchema,
        reason: requiredTextSchema,
      })
      .strict(),
    z
      .object({
        source_issue_id: uuidSchema,
        target_issue_id: uuidSchema,
        source_version: expectedVersionSchema,
        target_version: expectedVersionSchema,
        decision: z.enum(['accepted', 'rejected']),
      })
      .strict(),
  ),
  admin_feedback_decide: action(
    z
      .object({
        feedback_id: uuidSchema,
        issue_id: uuidSchema,
        expected_version: expectedVersionSchema,
        decision: z.enum(['accepted', 'rejected']),
        reason: requiredTextSchema,
      })
      .strict(),
    workflowResultSchema,
  ),
  admin_analytics: action(
    z
      .object({
        from: isoDateTimeSchema,
        to: isoDateTimeSchema,
        category: categorySchema.optional(),
      })
      .strict(),
    z
      .object({
        total: z.number().int().nonnegative(),
        open: z.number().int().nonnegative(),
        overdue: z.number().int().nonnegative(),
        resolved: z.number().int().nonnegative(),
        median_ack_hours: z.number().nonnegative().nullable(),
        median_resolution_hours: z.number().nonnegative().nullable(),
        by_category: z.array(
          z
            .object({
              category: categorySchema,
              count: z.number().int().nonnegative(),
            })
            .strict(),
        ),
        by_status: z.array(
          z
            .object({
              status: statusSchema,
              count: z.number().int().nonnegative(),
            })
            .strict(),
        ),
        hotspots: z.array(
          z
            .object({
              lat: z.number().min(-90).max(90),
              lng: z.number().min(-180).max(180),
              count: z.number().int().nonnegative(),
            })
            .strict(),
        ),
      })
      .strict(),
  ),
  admin_staff_list: action(
    emptyPayloadSchema,
    z
      .object({
        items: z.array(
          z
            .object({
              user_id: uuidSchema,
              display_name: z.string(),
              role: roleSchema,
              active: z.boolean(),
              team_ids: z.array(uuidSchema).optional(),
            })
            .strict(),
        ),
        teams: z.array(teamSchema),
      })
      .strict(),
  ),
  admin_membership_set: action(
    z
      .object({
        user_id: uuidSchema,
        role: roleSchema,
        active: z.boolean(),
      })
      .strict(),
    z
      .object({
        user_id: uuidSchema,
        role: roleSchema,
        active: z.boolean(),
      })
      .strict(),
  ),
  admin_team_set: action(
    z
      .object({
        id: uuidSchema.optional(),
        name_en: requiredTextSchema,
        name_ta: requiredTextSchema,
        active: z.boolean(),
      })
      .strict(),
    teamSchema,
  ),
  admin_routing_set: action(
    routingRuleSchema.omit({ category: true }).extend({
      category: categorySchema,
    }),
    routingRuleSchema,
  ),
  admin_routing_list: action(
    emptyPayloadSchema,
    z.object({ items: z.array(routingRuleSchema) }).strict(),
  ),
} as const;

export type ActionName = keyof typeof actionContracts;
export type ActionPayload<A extends ActionName> = z.infer<
  (typeof actionContracts)[A]['payload']
>;
export type ActionData<A extends ActionName> = z.infer<
  (typeof actionContracts)[A]['data']
>;

export interface ApiRequest<A extends ActionName = ActionName> {
  api_version: 1;
  action: A;
  request_id: string;
  payload: ActionPayload<A>;
}

export interface ApiError {
  code: string;
  message_key: string;
  retryable: boolean;
  field_errors?: Record<string, string>;
}

export type ApiResult<T> =
  | { ok: true; data: T; request_id: string }
  | { ok: false; error: ApiError; request_id: string };

export function createRequestSchema<A extends ActionName>(actionName: A) {
  return z
    .object({
      api_version: z.literal(1),
      action: z.literal(actionName),
      request_id: uuidSchema,
      payload: actionContracts[actionName].payload,
    })
    .strict();
}
