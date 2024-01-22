import { VariantProps, cva } from 'class-variance-authority';
import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

const customTextAreaStyles = cva(['hover:bg-secondary-hover, transition-colors'], {
    variants: {
        variant: {
            default: ['border', 'border-gray-300', 'rounded-md'],
        },
        size: {
            default: ['w-full', 'mt-1', 'p-2'],
            half: ['w-3/4', 'p-2'],
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

type CustomTextAreaProps = VariantProps<typeof customTextAreaStyles> & ComponentProps<'textarea'>;

const CustomTextArea: React.FC<CustomTextAreaProps> = ({ variant, size, className, ...props }) => {
    return (
        <textarea {...props} className={twMerge(customTextAreaStyles({ variant, size }), className)} />
    );
};

export default CustomTextArea;
