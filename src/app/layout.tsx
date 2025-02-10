import LocaleSwitch from '@/components/locale_switch';
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
 
export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
 
  return (
    <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider messages={messages}>
            <LocaleSwitch />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}