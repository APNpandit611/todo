import React from "react";
import { FieldError } from "react-hook-form";

type InputFieldProps = {
    label: string;
    name: string;
    type?: string;
    defaultValue?: string;
    register: any;
    error?: FieldError;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
    label,
    name,
    type,
    defaultValue,
    register,
    error,
    inputProps,
}: InputFieldProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-xs text-gray-400">{label}</label>
            <input
                className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm border-none w-full"
                type={type}
                defaultValue={defaultValue}
                {...register(name)}
                {...inputProps}
            />
            {error?.message && (
                <p className="text-xs text-red-400"> 
                    {error?.message}
                </p>
            )}
        </div>
    );
};

export default InputField;
