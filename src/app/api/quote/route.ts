import { Locale } from "@/i18n/config";
import { getLocale } from "next-intl/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const lng = url.searchParams.get('lng') as Locale || await getLocale();

    const quotesList: { [key: string]: () => Promise<{ quotes: { name: string; text: string; }[]; }> } = {
        en: () => import('./quotes-en.json').then((module) => module.default),
        he: () => import('./quotes-he.json').then((module) => module.default),
        ua: () => import('./quotes-ua.json').then((module) => module.default),
        ru: () => import('./quotes-ru.json').then((module) => module.default),
    }

    const { quotes } = await quotesList[lng]();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    return Response.json(randomQuote);
}
