import { VariantProps, cva } from 'class-variance-authority';
import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

const customInputTextStyles = cva(['hover:bg-secondary-hover, transition-colors'], {
    variants: {
        variant: {
            default: ['border', 'border-gray-300', 'rounded-md'],
        },
        size: {
            default: ['w-full', 'mt-1', 'p-2'],
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

type CustomInputTextProps = VariantProps<typeof customInputTextStyles> & ComponentProps<'input'>;

const CustomInputText: React.FC<CustomInputTextProps> = ({ variant, size, className, ...props }) => {
    return (
        <input {...props} className={twMerge(customInputTextStyles({ variant, size }), className)} />
    );
};

export default CustomInputText;
