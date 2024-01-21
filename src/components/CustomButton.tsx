import React, { ComponentProps } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const buttonStyles = cva(["hover:bg-secondary-hover, transition-colors"], {
    variants: {
        variant: {
            default: ["bg-secondary-button", "hover:bg-secondary-buttonhover", "text-white", "font-medium"],
            plain: ["bg-secondary", "hover:bg-secondary-hover", "text-black", "font-medium"],
            alert: ["bg-red-500", "hover:bg-red-700", "text-white", "font-medium"],
        },
        size: {
            default: ["rounded", "p-2"],
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
})

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">

const CustomButton = ({ variant, size, className, ...props }: ButtonProps) => {
    return (
        <button {...props} className={twMerge(buttonStyles({ variant, size }), className)}>

        </button>
    )
}

export default CustomButton
