'use client'
import { Input } from "@/features/shared/components/inputs/Input";
import { useForm } from "@/features/shared/hooks/useForm";

export default function Login() {
    const initialForm = {
        email: '',
        password: ''
    }
    const { values, handleChange } = useForm({ initialForm });
    const { email, password } = values;
    return (
        <div className="flex flex-col justify-center items-center">
            
            <form className="flex flex-col gap-4">
                <Input
                    label="Email"
                    name="email"
                    value={email}
                    handleChange={handleChange}
                />
                <Input
                    label="Contraseña"
                    name="password"
                    value={password}
                    handleChange={handleChange}
                />
            </form>
        </div>
    )
}