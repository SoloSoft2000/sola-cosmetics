import { Locale } from "@/i18n/config";
import { getLocale } from "next-intl/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lng = url.searchParams.get('lng') as Locale || await getLocale();
    
    const servicesList: { [key: string]: () => Promise<{ services: { image: string; title: string; description: string }[]; }> } = {
        en: () => import('./services-en.json').then((module) => module.default),
        he: () => import('./services-he.json').then((module) => module.default),
        ua: () => import('./services-ua.json').then((module) => module.default),
        ru: () => import('./services-ru.json').then((module) => module.default),
    };

    const { services } = await servicesList[lng]();

    const imageCode = url.searchParams.get('serviceId');

    if (imageCode) {
        const service = services.find((service) => service.image === imageCode);
        if (service) {
            return Response.json(service);
        } else {
            return new Response(JSON.stringify({ error: "Service not found" }), { status: 404 });
        }
    }

    return Response.json(services);
}
