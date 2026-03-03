'use client'
import Image from "next/image";
import { Input } from "@/features/shared/components/inputs/Input";
import { useForm } from "@/features/shared/hooks/useForm";
import google from '@/public/shared/icons/google.png';
import { Button } from "@/features/shared/components/button/Button";
import Link from "next/link";

export default function Login() {
    const initialForm = {
        email: '',
        password: ''
    }
    const { values, handleChange } = useForm({ initialForm });
    const { email, password } = values;
    return (
        <div className="flex  items-center h-full ">
            <div className="flex flex-col items-center gap-8 w-full">
                <h2 className="text-3xl font-bold">Login</h2>
                <p className="text-sm w-full text-gray-500">Aun no tengo una cuenta? <Link className='underline' href={'/create-account'}>registrarse</Link></p>
                <form className="flex flex-col gap-4 w-full">
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
                    <Button text="Iniciar sesion" className="w-full" />
                    <hr className="border-gray-500" />
                    <div className="flex justify-center">
                        <button className="p-2 rounded-lg border border-gray-500 cursor-pointer hover:bg-gray-500 transition-all duration-100 flex gap-2 items-center">
                            <Image
                                src={google}
                                alt="google"
                                width={15}
                                height={15}
                            />
                            <span className="text-sm">Google</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}