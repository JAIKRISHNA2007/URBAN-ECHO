import { Braces, Layers3, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { publicEnvironment } from '@/shared/config/env';
import { AppHeader, Card, DemoBanner, PageHeader } from '@/shared/ui';

const foundationCards = [
  {
    icon: Layers3,
    titleKey: 'foundation.architectureTitle',
    bodyKey: 'foundation.architectureBody',
  },
  {
    icon: Braces,
    titleKey: 'foundation.contractsTitle',
    bodyKey: 'foundation.contractsBody',
  },
  {
    icon: ShieldCheck,
    titleKey: 'foundation.boundariesTitle',
    bodyKey: 'foundation.boundariesBody',
  },
] as const;

export function FoundationPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-background min-h-screen">
      {publicEnvironment.dataMode === 'mock' ? <DemoBanner /> : null}
      <AppHeader />
      <main className="mx-auto max-w-[75rem] px-4 py-10 sm:px-6 lg:py-14">
        <PageHeader
          description={t('foundation.description')}
          eyebrow={t('foundation.eyebrow')}
          title={t('foundation.title')}
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {foundationCards.map(({ bodyKey, icon: Icon, titleKey }) => (
            <Card key={titleKey}>
              <span className="rounded-control bg-secondary text-primary mb-4 flex size-11 items-center justify-center">
                <Icon aria-hidden="true" size={22} />
              </span>
              <h2 className="text-lg font-semibold">{t(titleKey)}</h2>
              <p className="text-muted-foreground mt-2">{t(bodyKey)}</p>
            </Card>
          ))}
        </div>

        <Card className="border-primary/20 bg-secondary/50 mt-6">
          <p className="text-primary text-sm font-semibold">
            {t('foundation.statusLabel')}
          </p>
          <p className="text-foreground mt-1">{t('foundation.statusValue')}</p>
        </Card>
      </main>
    </div>
  );
}
