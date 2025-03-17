import "./globals.css";
import clsx from 'clsx';

import Background from '@/components/Background';
import { heebo, philosopher } from '@/components/fonts';
import { Header } from '@/components/Header/Header';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const font = locale === 'he' ? heebo : philosopher;

  return (
    <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
      <body className={clsx('relative overflow-x-hidden min-h-screen', font.className)}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <Background />
          {children}
          <footer className="mx-auto w-full">
            <div className="text-center p-4" dir="ltr">
              Made by <span className="text-primary">Solomonik Eugene!</span>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
