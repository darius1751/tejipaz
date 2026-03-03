'use client'
import { Back } from "@/features/shared/components/back/Back";
import { Button } from "@/features/shared/components/button/Button";
import { Input, InputPhone } from "@/features/shared/components/inputs";
import { useForm } from "@/features/shared/hooks/useForm";
import Image from "next/image";
import google from '@/public/shared/icons/google.png';
import { countries } from "@/features/shared/constants/countries";

export default function CreateAccount() {
    const initialForm = {
        name: '',
        email: '',
        password: '',
        code: '',
        phone: '',
    }
    const { values, handleChange } = useForm({ initialForm });
    const { name, email, code, phone, password } = values;
    return (
        <div className="flex flex-col gap-4">
            <Back to="/login" text="Regresar a login" />
            <div className="flex flex-col items-center gap-8 w-full">
                <h2 className="text-3xl font-bold">Create account</h2>
                <form className="flex flex-col gap-4 w-full">
                    <div className="flex gap-2 flex-col md:flex-row">
                        <Input
                            className="max-w-56"
                            name="name"
                            value={name}
                            handleChange={handleChange}
                            placeholder="Nombre"
                        />
                        <Input
                            className="max-w-56"
                            name="email"
                            value={email}
                            handleChange={handleChange}
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="flex gap-2 flex-col md:flex-row">
                        <InputPhone
                            // className="max-w-56"
                            code={code}
                            phone={phone}
                            handleChange={handleChange}
                            placeholderPhone="3000000000"
                        />
                        {/* <Input
                            className="max-w-56"
                            name="email"
                            value={email}
                            handleChange={handleChange}
                            type="email"
                            placeholder="Email"
                        /> */}
                    </div>
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