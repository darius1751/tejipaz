import z from "zod"
import { CreateAccount } from "../interfaces/CreateAccount"
import { countries } from "@/features/shared/constants/countries"

export const validateCreateAccount = (createAccount: CreateAccount) => {
    // {
    //     name: '',
    //     email: '',
    //     code: '',
    //     phone: '',
    //     country: '',
    //     city: '',
    //     address: '',
    //     password: '',
    //     confirmPassword: '',
    // }
    const validateCreateAccountSchema = z.object({
        // name: z.string(),
        // email: z.email("Formato de email no valido."),
        // code: z.enum(countries.map(({ codeCountry }) => codeCountry), "Codigo seleccionado no en la lista."),
        // country: z.enum(countries.map(({ name }) => name), "Pais seleccionado no en la lista"),
        // city: z.string().min(5, "Ciudad no valida"),
        // address: z.string().min(5, "Direccion no valida"),
        // password: z.string()
        //     .min(8, 'Password must be at least 8 characters')
        //     .max(20, 'Password must be less than 20 characters')
        //     .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        //     .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        //     .regex(/[0-9]/, 'Password must contain at least one number')
        //     .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    })
    return validateCreateAccountSchema.parse(createAccount);
}