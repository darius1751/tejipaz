'use client'

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Cart, CartItem as ICartItem } from "@/interfaces";
import { DeleteCartItem } from "./DeleteCartItem";
import { Slider } from "@/features/shared/components/slider/Slider";
import { Link } from "@/i18n/navigation";
import { Modal } from "@/features/shared/components/effects/modal/Modal";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

type Props = ICartItem & { _id: string };

export const CartItem = ({ _id, name, cant, images, price, slug }: Props) => {
    const [currentCant, setCurrentCant] = useState(cant);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const updateStorage = (newCant: number) => {
        const cart = JSON.parse(localStorage.getItem('cart') || '{}') as Cart;
        cart[_id].cant = newCant;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    const incrementCant = (change: number) => {
        setCurrentCant(currentCant + change);
        updateStorage(currentCant + change);
    }
    const handleChangeCant = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentCant(+e.target.value);
        updateStorage(+e.target.value);
    }
    const handleClose = () => {
        setOpenDeleteModal(false);
    }
    const handleDelete = () => {
        setOpenDeleteModal(true);
    }

    return (
        <tr>
            <td className='text-center p-3'>
                <IoClose className="w-6 h-6 text-red-700 mx-auto cursor-pointer" onClick={handleDelete} />
                {openDeleteModal && <Modal
                    handleClose={handleClose}
                >
                    <DeleteCartItem _id={_id} name={name} handleClose={handleClose} />
                </Modal>}
            </td>
            <td className='text-center'>
                <Slider autoPlay={{ time: 4000 }} className="w-40! mx-auto">
                    {
                        images?.map((image, i) => (<Image key={`${_id}_${i}`} alt={`${_id}_${i}`} className='object-cover w-auto' src={image} height={160} width={160} />))
                    }
                </Slider>
            </td>
            <td>
                <Link href={`/shop/products/${slug}`} className="block hover:underline font-bold mx-auto w-fit max-w-56 max-h-[90px] overflow-auto">
                    {name}
                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi labore perspiciatis voluptatibus officiis placeat ratione eum inventore temporibus suscipit obcaecati blanditiis, quam perferendis, alias ipsam vel nam maxime quis animi. */}
                </Link>
            </td>
            <td className='text-center'>
                <strong className="block w-32 text-center mx-auto font-normal">{price?.toLocaleString('en-US', { style: 'currency', currency: 'USD', compactDisplay: 'long', maximumFractionDigits: 2, currencyDisplay: 'narrowSymbol', })}</strong>
            </td>
            <td className='mx-auto'>
                <div className="flex gap-4 justify-center items-center">
                    <FiMinus className="cursor-pointer" onClick={() => incrementCant(-1)} />
                    <input value={currentCant} className='max-w-10 text-center' onChange={handleChangeCant} min={1} max={20} />
                    <GoPlus className="cursor-pointer" onClick={() => incrementCant(1)} />
                </div>
            </td>
            <td className='text-center'>
                <strong className="block w-32 text-center mx-auto">
                    {(price * currentCant)?.toLocaleString('en-US', { style: 'currency', currency: 'USD', compactDisplay: 'long', maximumFractionDigits: 2, currencyDisplay: 'narrowSymbol', })}
                </strong>
            </td>
        </tr>
    )
}