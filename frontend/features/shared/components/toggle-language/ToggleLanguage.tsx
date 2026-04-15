'use client'
import { ChangeEvent, useState } from "react"
import { useLocale } from "next-intl"
import { InputDropdown } from "@/features/shared/components/inputs/InputDropdown"
import { usePathname, useRouter } from "@/i18n/navigation"
import { localesWithEmoji } from "@/lib/locales"
// import { RedirectType } from "next/navigation"
export const ToggleLanguage = () => {
    const currentLocale = useLocale();
    const [locale, setLocale] = useState(currentLocale);
    const router = useRouter();
    const pathname = usePathname();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newLanguage = e.target.value;
        setLocale(newLanguage);
        router.push(pathname, { locale: newLanguage });
        router.refresh();
    }

    return (
        <div>
            <InputDropdown
                name="language"
                options={localesWithEmoji.map((locale) => (locale))}
                handleChange={handleChange}
                value={locale}
                classNameOptions="w-full"
                classNameInput="!text-white"
            />
        </div>
    )
}