'use client'
import { useEffect, useState } from 'react'
import { ajax } from 'rxjs/ajax'
import { Loading } from '@/features/shared/components/loading/Loading';
import { Product } from '@/interfaces/Product.interface';
import { Input } from '@/features/shared/components/inputs';
import { Slider } from '@/features/shared/components/slider/Slider';
import Image from 'next/image';
import { DotVariants } from '@/features/shared/components/slider/dot.variants';
// import { useForm } from '@/features/shared/hooks/useForm';

type Props = {
    slug: string;
}
export const ProductDetail = ({ slug }: Props) => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<Product>();
    // const [categories, setCategories] = useState<Category[]>([]);
    // const [tags, setTags] = useState<Tag[]>([]);
    // const { values, handleChange } = useForm({ initialForm });
    // const { search } = values;
    useEffect(() => {
        ajax.getJSON<Product>(`${process.env.NEXT_PUBLIC_API_URL}/product/slug/${slug}`).subscribe({
            next: (value) => {
                console.log({ value });
                setProduct(value);
            },
            complete: () => {
                setLoading(false)
                console.log('Complete')
            }
        })

    }, []);
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col lg:flex-row gap-8 justify-between'>
                <Slider
                    dots={{ activeColor: 'bg-blue', desactiveColor: 'bg-gray', variant: DotVariants.FULL_ROUNDED }}
                    autoPlay={{
                        time: 3000,
                    }}
                    className='lg:min-w-96 lg:w-1/2! flex-none'
                >
                    {
                        product?.images?.map?.((image, i) => (
                            <div key={`slide-${i}`} className='[background:linear-gradient(45deg,#34B4F4_35%,transparent)]'>
                                <Image src={image} alt={`image-${i}`} className='w-full' width={500} height={500} />
                            </div>
                        )) || []
                    }
                </Slider>
                <div className='flex flex-col gap-4'>
                    <h3 className='text-2xl font-bold'>{product?.name}</h3>
                    <div className='flex flex-col gap-2'>
                        <p className='lg:h-60 overflow-auto text-justify'>
                            {product?.description}
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, laudantium odio. Ratione, nam! Quia, laudantium? Officiis consequatur harum reprehenderit esse molestiae dicta pariatur? Non quam nihil hic nemo eius excepturi.
                            Fugit voluptas porro quaerat natus voluptates in, molestiae eligendi ad recusandae dicta cupiditate? Aperiam similique obcaecati quas excepturi? Nobis odit nulla blanditiis placeat. Hic nulla voluptates nesciunt at, distinctio dolorum.
                            Aliquid voluptatem blanditiis illo necessitatibus alias ut enim voluptates reiciendis est? Dolor vero nihil dolorum accusamus possimus? Aliquid cupiditate, quasi ex ipsam adipisci sequi expedita corrupti incidunt quos odit aliquam.
                            Odit molestias distinctio, expedita, doloremque velit id eos ipsa provident nulla autem, modi architecto ipsum in soluta. Velit, nulla deserunt ex sint natus beatae, mollitia atque rem nam quaerat cupiditate.
                            Quas culpa sit fugiat dicta explicabo hic dignissimos incidunt at alias facilis quis asperiores voluptas, inventore optio veniam. Beatae autem iure ex eos id inventore error veniam culpa facilis libero!
                            Adipisci nisi, fuga quae odio laboriosam incidunt qui similique voluptate tenetur asperiores aliquam numquam maxime deleniti illo ullam, fugit aperiam facilis eos est ut debitis! Assumenda magnam possimus expedita in.
                        </p>
                        <strong className="text-xl text-gold">{product?.price?.toLocaleString('en-US', { style: 'currency', currency: 'USD', compactDisplay: 'long', maximumFractionDigits: 2, currencyDisplay: 'narrowSymbol', })}</strong>
                        <ul className='flex gap-3'>
                            {product?.tags?.filter?.(({ available }) => available).map?.(({ _id, name, color }) => (
                                <div key={_id} className={`border rounded-xl p-3`} style={{
                                    backgroundColor: color,
                                    color: `${color}80`,
                                    borderColor: `${color}80`,
                                }}>{name}</div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}