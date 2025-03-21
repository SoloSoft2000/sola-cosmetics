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
  const isHebrew = locale === 'he';

  return (
    <html lang={locale} dir={isHebrew ? 'rtl' : 'ltr'}>
      <body className={
        clsx('relative overflow-x-hidden min-h-screen',
          isHebrew && heebo.className,
          !isHebrew && philosopher.className
        )
      }>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <Background />
          {children}
          <footer className="mx-auto w-full">
          <div className="text-center p-4" dir="ltr">
            Made by <span className="text-[#e7687f]">Solomonik Eugene!</span>
          </div>
        </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}