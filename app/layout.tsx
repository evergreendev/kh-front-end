import type {Metadata} from "next";
import {open_sans, pt_serif} from "@/app/fonts";
import "@/app/globals.css";

async function getMeta() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/globals/site-options?locale=undefined&draft=false&depth=1`,
        {
            next: {
                tags: ["siteOptions_"]
            }
        });
    return await res.json();
}


export async function generateMetadata(): Promise<Metadata> {

    const meta = await getMeta();


    return {
        title: meta.siteTitle,
        description: meta.siteDescription,
    }
}

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const meta = await getMeta();
    return (
        <html lang="en">
        <body className={`${open_sans.variable} ${pt_serif.variable}`}>{children}</body>
        </html>
    );
}
