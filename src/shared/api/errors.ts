import type { ApiResult } from '@/shared/contracts';

export function apiFailure<T>(
  requestId: string,
  code: string,
  messageKey: string,
  retryable: boolean,
): ApiResult<T> {
  return {
    ok: false,
    error: {
      code,
      message_key: messageKey,
      retryable,
    },
    request_id: requestId,
  };
}
