import { getLocale } from "next-intl/server";

export async function GET() {
    const locale =  await getLocale();

    const quotesList: { [key: string]: () => Promise<{ quotes: { name: string; text: string; }[]; }> } = {
        en: () => import('./quotes-en.json').then((module) => module.default),
        he: () => import('./quotes-he.json').then((module) => module.default),
        ua: () => import('./quotes-ua.json').then((module) => module.default),
        ru: () => import('./quotes-ru.json').then((module) => module.default),
    }

    const { quotes } = await quotesList[locale]();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    return Response.json(randomQuote);
}
