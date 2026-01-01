"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Loader2, type LucideIcon } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button-variants";

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    loading?: boolean;
    leftIcon?: LucideIcon;
    rightIcon?: LucideIcon;
    "aria-label"?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            fullWidth,
            loading = false,
            leftIcon: LeftIcon,
            rightIcon: RightIcon,
            children,
            disabled,
            "aria-label": ariaLabel,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={cn(buttonVariants({ variant, size, fullWidth }), className)}
                aria-label={ariaLabel}
                aria-busy={loading}
                {...props}
            >
                {loading ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span className="sr-only">Loading...</span>
                    </>
                ) : (
                    <>
                        {LeftIcon && <LeftIcon className="h-4 w-4" aria-hidden="true" />}
                        {children}
                        {RightIcon && <RightIcon className="h-4 w-4" aria-hidden="true" />}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };
