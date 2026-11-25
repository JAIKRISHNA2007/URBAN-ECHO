import { FlaskConical } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function DemoBanner() {
  const { t } = useTranslation();

  return (
    <div className="border-warning/30 bg-warning/10 text-warning border-b">
      <div className="mx-auto flex min-h-11 max-w-[75rem] items-center gap-2 px-4 py-2 text-sm font-semibold sm:px-6">
        <FlaskConical aria-hidden="true" className="shrink-0" size={18} />
        <span>{t('common.demoBanner')}</span>
      </div>
    </div>
  );
}
