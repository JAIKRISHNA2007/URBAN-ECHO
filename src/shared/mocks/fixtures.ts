import type { ActionData, ActionPayload } from '@/shared/contracts';

export const demoVillages = [
  {
    id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    code: 'DEMO-A',
    name_en: 'Fictional Village A',
    name_ta: 'கற்பனை கிராமம் அ',
  },
  {
    id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    code: 'DEMO-B',
    name_en: 'Fictional Village B',
    name_ta: 'கற்பனை கிராமம் ஆ',
  },
] as const;

export const reportCreateRequestId = '11111111-1111-4111-8111-111111111111';

export const reportCreatePayload: ActionPayload<'report_create'> = {
  category: 'streetlights',
  description: 'Streetlight near the demo bus stop is not working.',
  location: {
    lat: 12.9,
    lng: 80,
    accuracy_m: 12,
    source: 'gps',
    landmark: 'Demo bus stop',
  },
  visibility: 'anonymous',
  media_ids: [],
  user_severity: 3,
  ai_consent: true,
  source_language: 'en',
};

export const reportCreateData: ActionData<'report_create'> = {
  report_id: '22222222-2222-4222-8222-222222222222',
  reference: 'R-000000000001',
  issue_id: '33333333-3333-4333-8333-333333333333',
  issue_reference: 'I-000000000001',
  status: 'received',
  ai_status: 'pending',
};
