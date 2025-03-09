import { getUserLocale } from '@/i18n/locale';
import { useTranslations } from 'next-intl';
 
export default function HomePage() {
  const t = useTranslations('posts');
  return <h1>{t('title')} <span> {getUserLocale()}</span></h1>;
}