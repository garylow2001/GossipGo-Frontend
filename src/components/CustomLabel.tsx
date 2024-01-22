import { VariantProps, cva } from 'class-variance-authority';
import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

const customLabelStyles = cva(['hover:bg-secondary-hover, transition-colors'], {
    variants: {
        variant: {
            default: ['block', 'text-sm', 'font-medium'],
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

type CustomLabelProps = VariantProps<typeof customLabelStyles> & ComponentProps<'label'>;

const CustomLabel: React.FC<CustomLabelProps> = ({ variant, className, ...props }) => {
    return (
        <label {...props} className={twMerge(customLabelStyles({ variant }), className)} />
    );
};

export default CustomLabel;
