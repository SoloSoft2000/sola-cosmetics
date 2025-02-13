'use server';

import {cookies, headers} from 'next/headers';
import {locales, Locale, defaultLocale} from '@/i18n/config';
import { match } from "@formatjs/intl-localematcher";
import Negotiator from 'negotiator';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  const cookieStore = await cookies();
  const lngFromCookie = cookieStore.get(COOKIE_NAME)?.value as Locale;
  if (lngFromCookie) return lngFromCookie;

  const acceptLng = (await headers()).get("Accept-Language");
  if (acceptLng) {
    const lngs = new Negotiator({ headers: { "accept-language": acceptLng } }).languages();
    return match(lngs, locales, defaultLocale);
  }

  return defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
