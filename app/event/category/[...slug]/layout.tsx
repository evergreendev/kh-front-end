import type {Metadata} from "next";
import {open_sans, pt_serif} from "@/app/fonts";
import "@/app/globals.css";
import Script from "next/script";
import qs from "qs";
import {Event} from "@/app/types/payloadTypes";
import {Meta} from "@/app/types/types";

async function getMeta():Promise<Meta["siteOptions"]> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/globals/site-options?locale=undefined&draft=false&depth=1`,
        {
            next: {
                tags: ["siteOptions_"]
            }
        });
    return await res.json();
}

async function getPage(query: any, tag: string, page?: string): Promise<Event> {
    const stringifiedQuery = qs.stringify(
        {
            where: query,
        },
        {
            addQueryPrefix: true
        }
    );

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/eventCat/${stringifiedQuery}&depth=2`,
        {
            next: {
                tags: [tag]
            }
        }
    );

    const json = await res.json();

    return json.docs[0];
}


export async function generateMetadata({params}: { params: { slug: string[] } }): Promise<Metadata> {

    const page = await getPage({
        slug: {
            equals: params.slug[params.slug.length - 1]
        }
    }, "eventCat_");

    const meta = await getMeta();

    if (!page){
        return {
            title: meta.siteTitle,
            description: meta.siteDescription
        }
    }

    return {
        title: page.meta?.title || meta.siteTitle + " - " + page.title,
        description: page.meta?.description || meta.siteDescription,
    }
}

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <Script
            src="//https://linkprotect.cudasvc.com/url?a=https%3a%2f%2f%2f%2ftag.brandcdn.com%2fautoscript%2fcrazyhorsememorial_vgtsqk5fmvvsve09%2fCrazy_Horse_Memorial.js&c=E,1,-HJw6C0kycDXGRiVnsdST6VP3vcPRWtgjwIUtPnXdd_37gl5XrGUyEuIsC0nt3o6YkjXuXZQ6XtHNdMpX6ul8EIUeAh3G4RAJx1QebC9fsRu4wM,&typo=1"/>
        <Script src="https://fareharbor.com/embeds/api/v1/?autolightframe=yes"/>
        <body className={`font-opensans ${open_sans.variable} ${pt_serif.variable}`}>{children}</body>
        </html>
    );
}
