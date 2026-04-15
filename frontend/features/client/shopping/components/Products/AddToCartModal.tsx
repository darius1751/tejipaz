import { Button } from "@/features/shared/components/button/Button";
import { ButtonVariant } from "@/features/shared/components/button/Button.variant";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { MouseEventHandler } from "react";
import { FaCheckCircle } from "react-icons/fa"

type Props = {
    name: string;
    handleClose: MouseEventHandler<HTMLButtonElement>;
}
export const AddToCartModal = ({ name, handleClose }: Props) => {
    const t = useTranslations('Products.AddToCartModal');
    return (
        <div className="flex flex-col justify-between items-center gap-4 h-full">
            <FaCheckCircle className="text-5xl text-green-500/95" />
            <p>
                {t('text', { name })}
            </p>
            <h3>
                {t('promotional')}
            </h3>
            <div className="flex gap-4">
                <Button text={t('buttons.continue')} variant={ButtonVariant.BLUE} handleClick={handleClose} />
                {/* <Button text={t('buttons.viewCart')} variant={ButtonVariant.ORANGE} /> */}
                <Link href={'/shop/cart'} className="bg-orange hover:opacity-95 disabled:opacity-50 rounded-lg p-2 mb-2 cursor-pointer font-bold flex gap-2 items-center w-fit justify-center disabled:cursor-default">
                    {t('buttons.viewCart')}
                </Link>
            </div>
        </div>
    )
}