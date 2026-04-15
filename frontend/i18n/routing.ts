import { defineRouting } from 'next-intl/routing';
import { locales } from '@/lib/locales';
export const routing = defineRouting({
    // A list of all locales that are supported
    locales,
    localePrefix: 'always',
    // Used when no locale matches
    defaultLocale: 'es'
});