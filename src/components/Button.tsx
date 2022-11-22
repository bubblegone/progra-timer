import clsx from 'clsx';
import { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    disabled?: boolean;
    onClick: () => void;
    className?: string;
}

const ButtonBase = ({ children, disabled, onClick, className }: ButtonProps) => {
    return (
        <button
            className={clsx('rounded-lg px-6 py-1.5 font-medium shadow-lg', className)}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export const ButtonPrimary = ({ children, disabled, onClick, className }: ButtonProps) => {
    return (
        <ButtonBase
            children={children}
            onClick={onClick}
            disabled={disabled}
            className={clsx('text-white', disabled ? 'bg-off-black-tsp' : 'bg-off-black', className)}
        ></ButtonBase>
    );
};

export const ButtonSecondary = ({ children, disabled, onClick, className }: ButtonProps) => {
    return (
        <ButtonBase
            children={children}
            onClick={onClick}
            disabled={disabled}
            className={clsx('border border-off-black bg-purple text-off-black', className)}
        ></ButtonBase>
    );
};
