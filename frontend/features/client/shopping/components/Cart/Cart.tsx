'use client'
import { Cart as ICart } from '@/interfaces'
import { useEffect, useState } from 'react'
import { CartItem } from './CartItem';

export const Cart = () => {
    const [cart, setCart] = useState<ICart>({});

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart') || '{}'));
    }, [])

    return (
        <div className='flex flex-col gap-3'>
            <table>
                <thead>
                    <tr>
                        <th className='py-8'></th>
                        <th>Imagenes</th>
                        <th>Producto</th>
                        <th>Precio unitario</th>
                        <th> Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(cart).map((key) => (
                            <CartItem key={key} _id={key} {...cart[key]} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}