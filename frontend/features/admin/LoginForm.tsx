'use client'
import { FormEvent } from "react";
import { useForm } from "@/features/shared/hooks/useForm";
import { ButtonVariant } from "@/features/shared/components/button/Button.variant";
import { Button } from "@/features/shared/components/button/Button";
import { Input } from "@/features/shared/components/inputs";

export const LoginForm = () => {
    const initialForm = {
        email: '',
        password: ''
    }
    const { values, handleChange } = useForm({ initialForm });
    const { email, password } = values;
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="flex flex-col items-center gap-8 max-w-2xl w-full p-4 bg-black rounded-xl">
                <h2 className="text-3xl font-bold text-white">Login</h2>
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
                    <Button text="Iniciar sesion" className="w-full" variant={ButtonVariant.BLUE} type="submit" />
                    {/* <hr className="border-gray-500" />
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
                    </div> */}
                </form>
            </div>
        </div>
    )
}