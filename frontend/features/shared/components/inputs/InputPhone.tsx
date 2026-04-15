import { ChangeEventHandler, useId } from "react";
import { Input } from "./Input";
import { countries } from "../../constants/countries";
import { InputDropdown } from "./InputDropdown";

type Props = {
    code: string;
    phone: string;
    placeholderCode?: string;
    placeholderPhone?: string;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    requiredSignal?: boolean;
    className?: string;
    classNameDropdown?: string;
    classNameLabel?: string;
    classNameOption?: string;
    classNameOptions?: string;
    validation?: (value: string | number | readonly string[]) => string | undefined,
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>,
}
export const InputPhone = ({ code, phone, placeholderCode, placeholderPhone, label, handleChange, className = "", classNameDropdown = "", classNameLabel = "", classNameOption = "", classNameOptions = "", disabled = false, required = true, requiredSignal = !!label, validation }: Props) => {
    return (
        <div className={`${className} flex flex-col items-end`.trim()}>
            <div className="flex">
                <InputDropdown
                    classNameInput='rounded-e-none w-24 overflow-hidden text-nowrap text-ellipsis'
                    searcheable
                    name="code"
                    value={code}
                    handleChange={handleChange}
                    options={countries.map(({ codeCountry, name }) => ({ text: `${codeCountry} ${name}`, value: codeCountry }))}
                    placeholder={placeholderCode}
                    label={label}
                    requiredSignal={requiredSignal}
                    className={classNameDropdown}
                    classNameLabel={classNameLabel}
                    classNameOption={classNameOption}
                    classNameOptions={classNameOptions}
                    disabled={disabled}
                />
                <Input
                    classNameInput="rounded-s-none"
                    name="phone"
                    value={phone}
                    handleChange={(e) => {
                        e.preventDefault();
                        if (Number(e.target.value) || (!!!e.target.value.length))
                            handleChange(e)
                    }}
                    placeholder={placeholderPhone}
                    disabled={disabled}
                    required={required}
                    validation={validation}
                />
            </div>
        </div>
    )
}