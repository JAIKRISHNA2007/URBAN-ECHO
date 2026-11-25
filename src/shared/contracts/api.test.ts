import { describe, expect, it } from 'vitest';

import {
  actionContracts,
  createRequestSchema,
  resultSchema,
} from '@/shared/contracts';
import {
  reportCreateData,
  reportCreatePayload,
  reportCreateRequestId,
} from '@/shared/mocks';

describe('canonical report_create contract', () => {
  it('accepts the deterministic request fixture', () => {
    const request = {
      api_version: 1,
      action: 'report_create',
      request_id: reportCreateRequestId,
      payload: reportCreatePayload,
    };

    expect(createRequestSchema('report_create').parse(request)).toEqual(
      request,
    );
  });

  it('accepts the deterministic result fixture', () => {
    const result = {
      ok: true,
      data: reportCreateData,
      request_id: reportCreateRequestId,
    };

    expect(
      resultSchema(actionContracts.report_create.data).parse(result),
    ).toEqual(result);
  });

  it('rejects a text-only report shorter than ten characters', () => {
    expect(() =>
      actionContracts.report_create.payload.parse({
        ...reportCreatePayload,
        description: 'short',
      }),
    ).toThrow();
  });
});
