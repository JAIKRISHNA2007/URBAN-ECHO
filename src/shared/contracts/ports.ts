import type { Category, Severity, SourceLanguage } from './domain';

export type AiReviewFlag =
  | 'insufficient_evidence'
  | 'category_conflict'
  | 'possible_spam'
  | 'sensitive_content'
  | 'location_uncertain'
  | 'reused_image';

export interface ClassifyOutput {
  category: Category | null;
  severity: Severity | null;
  explanation: string;
  review_flags: AiReviewFlag[];
}

export interface ClaimedAiJob {
  job_id: string;
  report_id: string;
  claim_token: string;
  attempt: number;
}

export interface AiJobInput {
  report_id: string;
  village_id: string;
  redacted_description: string | null;
  sanitized_image_bytes: Uint8Array | null;
  source_language: SourceLanguage;
  category: Category;
}

export interface NearbyReportCandidate {
  report_id: string;
  issue_id: string;
  distance_m: number;
  category: Category;
  text_vector: number[] | null;
  image_vector: number[] | null;
  embedding_model_id: string | null;
}

export interface CompleteAiJobInput {
  job_id: string;
  claim_token: string;
  result: ClassifyOutput;
  model_id: string;
  embedding_model_id: string | null;
  text_vector: number[] | null;
  image_vector: number[] | null;
  latency_ms: number;
}

export interface FailAiJobInput {
  job_id: string;
  claim_token: string;
  error_code: string;
  retryable: boolean;
}

export interface AiWorkerDatabasePort {
  claimAiJob(): Promise<ClaimedAiJob | null>;
  getAiInput(reportId: string): Promise<AiJobInput>;
  findNearbyReports(reportId: string): Promise<NearbyReportCandidate[]>;
  completeAiJob(input: CompleteAiJobInput): Promise<void>;
  failAiJob(input: FailAiJobInput): Promise<void>;
}

export interface UploadReservation {
  media_id: string;
  storage_path: string;
  upload_token: string;
  expires_at: string;
}

export interface MediaUploadPort {
  upload(
    reservation: UploadReservation,
    bytes: ArrayBuffer,
    mimeType: 'image/jpeg' | 'image/png' | 'image/webp',
  ): Promise<void>;
}
