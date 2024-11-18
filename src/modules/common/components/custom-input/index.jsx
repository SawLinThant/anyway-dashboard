import { forwardRef } from "react";

const Input = forwardRef(({
    type,
    name,
    label,
    textColor,
    optional = false,
    placeholder,
    ...props
},ref) => {
    return(
        <div className="w-full flex flex-col gap-2">
            <div 
            style={{color:`${textColor}`}}
            className="flex flex-row items-start gap-1 justify-start">
            <label className="text-left" htmlFor={name}>{label}</label>
             <label className="text-sm pt-[2px]" htmlFor={name}>{optional?"(optional)":"*"}</label>
            </div>
           
            <input 
            placeholder={placeholder}
            className="border border-gray-600 p-2 rounded-lg focus:ring-0"
            type={type}
            name={name} 
            ref={ref}
            {...props}
            />
        </div>
    )
})
export default Input;