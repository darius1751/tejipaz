'use client'
import { useEffect, useState } from 'react'
import { ajax } from 'rxjs/ajax'
import { Loading } from '@/features/shared/components/loading/Loading';
import { Product } from '@/interfaces/Product.interface';
import { ProductCard } from './ProductCard';
import { Input } from '@/features/shared/components/inputs';
import { useForm } from '@/features/shared/hooks/useForm';
import { Category } from '@/interfaces/Category.interface';
// import { InputDropdown } from '@/features/shared/components/inputs/InputDropdown';
import { Tag } from '@/interfaces/Tag.interface';
import { useTranslations } from 'next-intl';
const initialForm = {
    search: '',
}
export const Products = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const t = useTranslations(`Products`)
    const { values, handleChange } = useForm({ initialForm });
    const { search } = values;
    useEffect(() => {
        ajax.getJSON<{ products: Product[] }>(`${process.env.NEXT_PUBLIC_API_URL}/product`).subscribe({
            next: (value) => {
                console.log({ value });
                setProducts(value.products);
            },
            complete: () => {
                setLoading(false)
                console.log('Complete')
            }
        })
        ajax.getJSON<Category[]>(`${process.env.NEXT_PUBLIC_API_URL}/category`).subscribe({
            next(value) {
                console.log({ value });
                setCategories(value);
            },
        });
        ajax.getJSON<Tag[]>(`${process.env.NEXT_PUBLIC_API_URL}/tag`).subscribe({
            next(value) {
                console.log({ value });
                setTags(value);
            },
        })
    }, []);
    return (
        <div>
            <div className='flex flex-col gap-4 items-center justify-center'>
                <h2 className='text-2xl font-bold'>{t('title')}</h2>
                <Input type='search' name='search' value={search} handleChange={handleChange} placeholder={t('search')} classNameInput='bg-black' />
            </div>
            {
                loading ? <Loading /> : (
                    <div className='flex gap-4'>
                        {/* <div className='w-96 p-4 flex flex-col gap-4'>
                            <ul>
                                {
                                    categories.map(({ _id, name, subcategories }) => (
                                        <li key={_id}>
                                            {name}
                                            <ul>
                                                {
                                                    subcategories.map(({ name }, i) => (
                                                        <li key={i}>{name}</li>
                                                    ))
                                                }
                                            </ul>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div> */}

                        <div className='w-full flex flex-wrap gap-4 justify-start p-4'>
                            {
                                products.map((product) => (<ProductCard key={product._id}{...product} />))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}