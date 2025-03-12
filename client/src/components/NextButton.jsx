import { Button, extendVariants } from "@nextui-org/react";

export const NextButton = extendVariants(Button, {
    variants: {
        // <- modify/add variants
        color: {
            background: "bg-[#111419] text-[#fff]",
            secondary: "bg-[#1d2029] text-[#fff]",
            light: "bg-[#ffff] text-[#000]",
            secondlight: " bg-[#0064d7]  text-[#ffff]",
            primary: "bg-[#009336] text-[#ffffff]",

        },
        isDisabled: {
            true: "bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed",
        },
        size: {
            xs: "px-2 min-w-12 h-6 text-tiny gap-1 rounded-small",
            md: "px-4 min-w-20 h-10 text-small gap-2 rounded-small",
            xl: "px-8 min-w-28 h-14 text-large gap-4 rounded-medium",
        },
    },
    defaultVariants: { // <- modify/add default variants
        color: "primary",
        size: "md",
    },
    compoundVariants: [ // <- modify/add compound variants
        {
            isDisabled: true,
            color: "primary",
            class: "bg-[#84cc16]/80 opacity-100",
        },
    ],
});