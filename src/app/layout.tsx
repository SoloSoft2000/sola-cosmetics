import "./globals.css";
import clsx from 'clsx';

import Background from '@/components/Background';
import { heebo, philosopher } from '@/components/fonts';
import { Header } from '@/components/Header/Header';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import Head from 'next/head';

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
      <Head>
        <title>Solomonik Alena - Beauty and Harmony</title>
        <meta name="description" content="Welcome to the world of beauty and harmony with Solomonik Alena, a cosmetologist from Katzrin, Israel." />
        <meta name="keywords" content="Beauty, Harmony, Services, Solomonik Alena, Confidence, Cosmetologist, Israel, Golan Heights" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
