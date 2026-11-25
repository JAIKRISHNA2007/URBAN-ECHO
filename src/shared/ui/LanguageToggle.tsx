import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from './Button';

export function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const isTamil = i18n.resolvedLanguage === 'ta';

  function toggleLanguage(): void {
    void i18n.changeLanguage(isTamil ? 'en' : 'ta');
  }

  return (
    <Button
      aria-label={`${t('common.language')}: ${isTamil ? t('common.english') : t('common.tamil')}`}
      onClick={toggleLanguage}
      size="compact"
      type="button"
      variant="secondary"
    >
      <Languages aria-hidden="true" size={18} />
      {isTamil ? t('common.english') : t('common.tamil')}
    </Button>
  );
}
