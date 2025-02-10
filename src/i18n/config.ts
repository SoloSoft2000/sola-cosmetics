export type Locale = (typeof locales)[number];

export const locales = ['en', 'ru', 'ua', 'he'] as const;
export const defaultLocale: Locale = 'ru';