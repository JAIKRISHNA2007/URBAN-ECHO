import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AppHeader, Button, Card, PageHeader } from '@/shared/ui';

interface MessagePageProps {
  titleKey: string;
  descriptionKey: string;
}

export function MessagePage({ descriptionKey, titleKey }: MessagePageProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-background min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-[40rem] px-4 py-10 sm:px-6">
        <Card>
          <PageHeader description={t(descriptionKey)} title={t(titleKey)} />
          <div className="mt-6">
            <Button asChild>
              <Link to="/">{t('common.returnToShell')}</Link>
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
