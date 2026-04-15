'use client'
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/features/shared/components/button/Button";
import { ButtonVariant } from "@/features/shared/components/button/Button.variant";
import { Modal } from "@/features/shared/components/effects/modal/Modal";
import { DotVariants } from "@/features/shared/components/slider/dot.variants";
import { Slider } from "@/features/shared/components/slider/Slider"
import { AddToCartModal } from "./AddToCartModal";
import { Product, } from "@/interfaces";
import { ModalVariant } from "@/features/shared/components/effects/modal/modal.variant";
import { Cart } from "@/interfaces/Cart.interface";

type Props = Product;
export const ProductCard = ({ _id, name, description, images, price, slug, }: Props) => {
    const t = useTranslations(`Products`);
    const [openModal, setOpenModal] = useState(false);
    const [cart, setCart] = useState<Cart>({});
    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart') || '{}'));
    }, []);
    const handleClose = () => {
        setOpenModal(false)
    }
    const handleAddToCart = () => {
        const newCart: Cart = { ...cart };
        newCart[_id] = { name, price, images, slug, cant: 1, }
        localStorage.setItem('cart', JSON.stringify(newCart));
        setOpenModal(true);
    }
    return (
        <div className="max-w-full w-40 md:w-[340px] flex flex-col gap-2 bg-[#d2d2d2] rounded-xl">
            <Slider
                className="[background:linear-gradient(45deg,#34B4F4_35%,transparent)] rounded-xl"
                autoPlay={{ time: 3500 }}
                dots={{ activeColor: '!w-3 !h-3 md:!w-4 md:!h-4 bg-black', desactiveColor: '!w-3 !h-3 md:!w-4 md:!h-4 bg-gray', variant: DotVariants.FULL_ROUNDED }}
            >
                {
                    images.map((image, i) => (
                        <div key={i} className="w-full h-[150px] md:h-[300px] rounded-xl">
                            {/* <Image
                                alt={`${name}-${i}`}
                                src={image}
                                className="mx-auto object-cover"
                                width={400}
                                height={400}
                            /> */}
                        </div>
                    ))
                }
            </Slider>
            <div className="p-2">
                <div className="bg-black text-white dark:bg-[#EBE4E3] dark:text-black rounded-xl p-3">
                    <Link href={`/shop/products/${slug}`} className="text-center font-bold text-lg md:text-2xl hover:underline">{name}</Link>
                    <p className="h-24 md:h-40 overflow-y-auto text-sm md:text-base">{description}</p>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <strong className="md:text-xl">{price?.toLocaleString('en-US', { style: 'currency', currency: 'USD', compactDisplay: 'long', maximumFractionDigits: 2, currencyDisplay: 'narrowSymbol', })}</strong>
                        <Button text={t('addToCart')} variant={ButtonVariant.BLUE} className="text-xs" handleClick={handleAddToCart} disabled={!!cart[_id]} />
                    </div>
                </div>
            </div>
            {
                openModal && (
                    <Modal
                        header={t('AddToCartModal.header')}
                        variant={ModalVariant.MIDDLE}
                        handleClose={handleClose}
                    >
                        <AddToCartModal name={name} handleClose={handleClose} />
                    </Modal>
                )}
        </div>
    )
}