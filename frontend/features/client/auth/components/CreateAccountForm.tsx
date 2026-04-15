'use client'
import { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import { Input, InputPhone } from "@/features/shared/components/inputs";
import { Back } from "@/features/shared/components/back/Back";
import { Button } from "@/features/shared/components/button/Button";
import { useForm } from "@/features/shared/hooks/useForm";
import { ButtonVariant } from "@/features/shared/components/button/Button.variant";
import { InputDropdown } from "@/features/shared/components/inputs/InputDropdown";
import { countries } from "@/features/shared/constants/countries";
import { CreateAccount } from "../interfaces/CreateAccount";
// import { validateCreateAccount } from "../validations/validateCreateAccount";
import z from "zod";
import { Alert } from "@/features/shared/components/effects/alert/Alert";
// import { AlertVariant } from "@/features/shared/components/effects/alert/alert.variant";
import google from '@/public/shared/icons/google.png';
import { Modal } from "@/features/shared/components/effects/modal/Modal";
import { useModal } from "@/features/shared/components/effects/modal/useModal";

export const CreateAccountForm = () => {
    const initialForm: CreateAccount = {
        name: '',
        email: '',
        code: '',
        phone: '',
        country: '',
        city: '',
        address: '',
        password: '',
        confirmPassword: '',
    }
    const countrycodes = countries.map(({ codeCountry }) => codeCountry);
    const countryNames = countries.map(({ name }) => name);
    const validations = {
        name: z.string("Solo se aceptan letras").regex(/^[A-Za-z]{3,}(\s[A-Za-z]{3,}){0,3}$/, "Formato de nombre no valido."),
        email: z.email("Formato de email no valido."),
        code: z.enum(countrycodes, "Codigo seleccionado no en la lista."),
        phone: z.string().min(7, "No puede tener menos de 7 digitos").max(10, "No puede tener mas de 10 digitos"),
        country: z.enum(countryNames, "Pais seleccionado no en la lista"),
        city: z.string()
            .min(5, "Ciudad no valida"),
        address: z.string()
            .min(5, "Direccion no valida"),
        password: z.string()
            .min(8, 'Password must be at least 8 characters')
            .max(20, 'Password must be less than 20 characters')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number')
            .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
        // confirmPassword: password != confirmPassword ? '' : ''
    }
    const { values, handleChange } = useForm<CreateAccount>({ initialForm });
    const [errors, setErrors] = useState<{ [x: string]: boolean }>({
        name: true,
        email: true,
        // code: true,
        phone: true,
        // country: true,
        city: true,
        address: true,
        password: true,
        confirmPassword: true,
    });
    const [loading, setLoading] = useState(false);
    const { name, email, code, phone, country, city, address, password, confirmPassword } = values;
    const availableSubmit = useMemo(() => {
        for (const key in errors) {
            if (errors[key])
                return false;
        }
        return !(!validations.country.safeParse(country).success || !validations.code.safeParse(code).success)
        // return true;
    }, [errors]);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (availableSubmit) {
            try {
                setLoading(true);
            } catch (err) {

            } finally {
                setLoading(false)
            }
        }
    }
    const { open, handleClose } = useModal();
    return (
        <div className="flex flex-col gap-4">
            <Alert title="Alerta" text="Alerta de prueba" />
            <Back to="/login" text="Regresar a login" />
            <div className="flex flex-col items-center gap-8 w-full">
                <h2 className="text-3xl font-bold text-white">Create account</h2>
                <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                    <div className="flex gap-2 flex-col md:flex-row">
                        <Input
                            className="max-w-56"
                            name="name"
                            value={name}
                            handleChange={handleChange}
                            placeholder="Nombre Completo"
                            validation={
                                (value) => {
                                    const { error, success } = validations.name.safeParse(value);
                                    setErrors({ ...errors, name: !success })
                                    return error?.issues[0]?.message;
                                }
                            }
                        />
                        <Input
                            className="max-w-56"
                            name="email"
                            value={email}
                            handleChange={handleChange}
                            type="email"
                            placeholder="Email"
                            validation={
                                (value) => {
                                    const { error, success } = validations.email.safeParse(value);
                                    setErrors({ ...errors, email: !success })
                                    return error?.issues[0]?.message;
                                }
                            }
                        />
                    </div>
                    <div className="flex gap-2 flex-col md:flex-row">
                        <InputPhone
                            placeholderCode="+57"
                            code={code}
                            phone={phone}
                            handleChange={handleChange}
                            placeholderPhone="3000000000"
                            validation={
                                (value) => {
                                    const { error, success } = validations.phone.safeParse(value);
                                    setErrors({ ...errors, phone: !success })
                                    return error?.issues[0]?.message;
                                }
                            }
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
                    <div className="flex gap-2 flex-col md:flex-row">
                        <InputDropdown
                            searcheable
                            className="w-full"
                            classNameInput="w-full"
                            classNameOptions="min-w-[231px]"
                            name="country"
                            value={country}
                            handleChange={handleChange}
                            options={countries.map(({ name }) => ({ value: name, text: name }))}
                            placeholder="Pais"
                        />
                        <Input
                            className="w-full"
                            classNameInput="w-full"
                            name="city"
                            value={city}
                            handleChange={handleChange}
                            type="text"
                            placeholder="Ciudad"
                            // autoComplete="address-level1"
                            validation={
                                (value) => {
                                    const { error, success } = validations.city.safeParse(value);
                                    setErrors({ ...errors, city: !success })
                                    return error?.issues[0]?.message;
                                }
                            }
                        />
                    </div>
                    <Input
                        name="address"
                        value={address}
                        handleChange={handleChange}
                        type="text"
                        placeholder="Direccion"
                        autoComplete="street-address"
                        validation={
                            (value) => {
                                const { error, success } = validations.address.safeParse(value);
                                setErrors({ ...errors, address: !success })
                                return error?.message;
                            }
                        }
                    />
                    <div className="flex gap-2 flex-col md:flex-row">
                        <Input
                            className="max-w-56"
                            name="password"
                            value={password}
                            handleChange={handleChange}
                            placeholder="Contraseña"
                            type="password"
                            validation={
                                (value) => {
                                    const { error, success } = validations.password.safeParse(value);
                                    setErrors({ ...errors, password: !success })
                                    return error?.issues[0]?.message;
                                }
                            }
                        />
                        <Input
                            className="max-w-56"
                            name="confirmPassword"
                            value={confirmPassword}
                            handleChange={handleChange}
                            placeholder="Confirmar contraseña"
                            type="password"
                            validation={
                                (value) => {
                                    const isValid = password === value;
                                    setErrors({ ...errors, confirmPassword: !isValid })
                                    return isValid ? undefined : "No coincide con la contraseña";
                                }
                            }
                        />
                    </div>
                    <Button text="Registrar me" className="w-full" variant={ButtonVariant.BLUE} type='submit' loading={loading} disabled={!availableSubmit} />
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
            {
                open && <Modal header="Modal" handleClose={handleClose}>
                    <p>Hola</p>
                </Modal>
            }
        </div>
    )
}