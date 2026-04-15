'use client'
import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { map } from "rxjs";
import { ajax } from "rxjs/ajax";
import { Input } from "@/features/shared/components/inputs/Input";
import { useForm } from "@/features/shared/hooks/useForm";
import { Button } from "@/features/shared/components/button/Button";
import { ButtonVariant } from "@/features/shared/components/button/Button.variant";
import google from '@/public/shared/icons/google.png';
export const LoginForm = () => {
    const initialForm = {
        email: '',
        password: ''
    }
    const [loading, setLoading] = useState(false);
    const { values, handleChange } = useForm({ initialForm });
    const { email, password } = values;
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setLoading(true);
            ajax({
                url: `${process.env.NEXT_PUBLIC_API_URL}/auth/login/email`,
                body: { email, password },
                method: 'POST',
                headers: {
                    credentials: 'include',
                    mode: 'cors'
                },
                withCredentials: true,

            })
                .pipe(map(({ response, status }) => ({ data: response, status })))
                .subscribe({
                    next: (value) => {
                        localStorage.setItem("user", JSON.stringify(value.data));                        
                    },
                    error(err) {
                        console.log({ err });
                    },
                })
        } catch (error) {
            console.log({ error });
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex items-center h-full ">
            <div className="flex flex-col items-center gap-8 w-full">
                <h2 className="text-3xl font-bold text-white">Login</h2>
                <p className="text-sm w-full text-gray-500">Aun no tengo una cuenta? <Link className='underline' href={'/create-account'}>registrarse</Link></p>
                <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        name="email"
                        value={email}
                        handleChange={handleChange}
                        placeholder="youremail@domain.com"
                        type="email"
                    />
                    <Input
                        label="Contraseña"
                        name="password"
                        value={password}
                        handleChange={handleChange}
                        type="password"
                        placeholder="*********"
                    />
                    <Button text="Iniciar sesion" className="w-full" variant={ButtonVariant.BLUE} loading={loading} />
                    <hr className="border-gray-500" />
                    <div className="flex justify-center">
                        <button className="p-2 rounded-lg border border-gray-500 cursor-pointer hover:bg-gray-500 transition-all duration-100 flex gap-2 items-center">
                            <Image
                                src={google}
                                alt="google"
                                width={15}
                                height={15}
                            />
                            <span className="text-sm text-white">Google</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}