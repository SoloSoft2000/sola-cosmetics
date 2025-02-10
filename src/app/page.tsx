import { getUserLocale } from '@/services/locale';
import { useTranslations } from 'next-intl';
 
export default function HomePage() {
  const t = useTranslations('home');
  return <h1>{t('title')} <span> {getUserLocale()}</span></h1>;
}