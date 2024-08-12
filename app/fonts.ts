import {PT_Serif, Open_Sans} from "next/font/google";

export const pt_serif = PT_Serif({
    subsets: ['latin'],
    weight: ["400", "700"],
    variable: '--font-ptserif',
});

export const open_sans = Open_Sans({
    subsets: ['latin'],
    weight: ["800", "700", "600", "500", "400", "300"],
    variable: '--font-open-sans'
});
