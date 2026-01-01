import { cva } from "class-variance-authority";

export const buttonVariants = cva(
    [
        "inline-flex items-center justify-center gap-2",
        "font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "select-none rounded-lg",
    ],
    {
        variants: {
            variant: {
                primary: [
                    "bg-primary-600 text-white",
                    "hover:bg-primary-700 hover:shadow-lg hover:scale-105",
                    "active:bg-primary-800 active:scale-95",
                    "focus-visible:ring-primary-500",
                ],
                secondary: [
                    "bg-secondary-100 text-secondary-900",
                    "hover:bg-secondary-200 hover:shadow-md",
                    "active:bg-secondary-300",
                    "focus-visible:ring-secondary-500",
                ],
                ghost: [
                    "text-neutral-300",
                    "hover:bg-neutral-800 hover:text-white",
                    "active:bg-neutral-700",
                    "focus-visible:ring-neutral-500",
                ],
                gradient: [
                    "bg-gradient-to-r from-primary-500 to-secondary-500 text-white",
                    "hover:shadow-xl hover:scale-105",
                    "active:scale-95",
                    "focus-visible:ring-primary-500",
                    "hover:from-primary-600 hover:to-secondary-600",
                ],
                glass: [
                    "bg-white/10 backdrop-blur-md border border-neutral-300 text-white",
                    "hover:bg-white/20 hover:border-neutral-400",
                    "active:bg-white/30",
                    "focus-visible:ring-white/50",
                ],
            },
            size: {
                sm: "h-9 px-3 text-sm",
                md: "h-10 px-4 text-base",
                lg: "h-11 px-6 text-lg",
                xl: "h-12 px-8 text-xl",
            },
            fullWidth: {
                true: "w-full",
                false: "w-auto",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            fullWidth: false,
        },
    }
);
