"use client";

import { setUserLocale } from "@/services/locale";
import { locales } from '../i18n/config';
import {useLocale} from 'next-intl';

export default function LocaleSwitch() {
    const currentLocale = useLocale();
    return (
        <div>
            {locales.map(locale => <button key={locale} disabled={locale === currentLocale}  onClick={() => setUserLocale(locale)}>{locale}</button>)}
        </div>
    );
}