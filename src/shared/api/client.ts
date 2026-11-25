import type { SupabaseClient } from '@supabase/supabase-js';

import {
  actionContracts,
  resultSchema,
  type ActionData,
  type ActionName,
  type ActionPayload,
  type ApiResult,
} from '@/shared/contracts';
import { publicEnvironment } from '@/shared/config/env';

import { apiFailure } from './errors';
import { createBrowserSupabaseClient } from './supabase';

export interface InvokeOptions {
  requestId?: string;
}

export interface ApiClient {
  invoke<A extends ActionName>(
    action: A,
    payload: ActionPayload<A>,
    options?: InvokeOptions,
  ): Promise<ApiResult<ActionData<A>>>;
}

type MockHandler<A extends ActionName> = (
  payload: ActionPayload<A>,
  requestId: string,
) => Promise<ApiResult<ActionData<A>>> | ApiResult<ActionData<A>>;

export type MockHandlers = {
  [A in ActionName]?: MockHandler<A>;
};

function requestId(options?: InvokeOptions): string {
  return options?.requestId ?? crypto.randomUUID();
}

export function createMockApiClient(handlers: MockHandlers = {}): ApiClient {
  return {
    async invoke<A extends ActionName>(
      action: A,
      payload: ActionPayload<A>,
      options?: InvokeOptions,
    ): Promise<ApiResult<ActionData<A>>> {
      const currentRequestId = requestId(options);
      const handler = handlers[action] as MockHandler<A> | undefined;

      if (!handler) {
        return apiFailure(
          currentRequestId,
          'mock_not_configured',
          'errors.mock_not_configured',
          false,
        );
      }

      return handler(payload, currentRequestId);
    },
  };
}

export function createLiveApiClient(
  supabase: SupabaseClient | null,
): ApiClient {
  return {
    async invoke<A extends ActionName>(
      action: A,
      payload: ActionPayload<A>,
      options?: InvokeOptions,
    ): Promise<ApiResult<ActionData<A>>> {
      const currentRequestId = requestId(options);

      if (!supabase) {
        return apiFailure(
          currentRequestId,
          'configuration_missing',
          'errors.configuration_missing',
          false,
        );
      }

      const { data, error } = await supabase.functions.invoke('api', {
        body: {
          api_version: 1,
          action,
          request_id: currentRequestId,
          payload,
        },
      });

      if (error) {
        return apiFailure(
          currentRequestId,
          'gateway_error',
          'errors.gateway_error',
          true,
        );
      }

      const parsedResult = resultSchema(actionContracts[action].data).safeParse(
        data,
      );

      if (!parsedResult.success) {
        return apiFailure(
          currentRequestId,
          'invalid_response',
          'errors.invalid_response',
          false,
        );
      }

      return parsedResult.data as ApiResult<ActionData<A>>;
    },
  };
}

export function createConfiguredApiClient(): ApiClient {
  if (publicEnvironment.dataMode === 'mock') {
    return createMockApiClient();
  }

  return createLiveApiClient(createBrowserSupabaseClient(publicEnvironment));
}
