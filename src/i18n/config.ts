export type Locale = (typeof locales)[number];

export const locales = ['en', 'ru', 'uk', 'he'] as const;
export const defaultLocale: Locale = 'ru';