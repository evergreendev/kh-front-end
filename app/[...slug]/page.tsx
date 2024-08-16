import Image from "next/image";
import MegaMenu from "@/app/components/MegaMenu";
import qs from "qs";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faTicket} from "@awesome.me/kit-2a2dc088e2/icons/classic/regular";
import Link from "next/link";
import Button, {buttonConfig} from "@/app/components/Button";
import {notFound} from "next/navigation";
import JumpMenu from "@/app/components/JumpMenu";
import BreadCrumbs from "@/app/components/BreadCrumbs";
import {Content} from "next/dist/compiled/@next/font/dist/google";
import PageContent from "@/app/[...slug]/PageContent";
import {HomeClient} from "@/app/Home.client";
import PageClient from "@/app/[...slug]/page.client";

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

async function getData(query: any, tag: string, page?: string) {
    const stringifiedQuery = qs.stringify(
        {
            where: query,
        },
        {
            addQueryPrefix: true
        }
    );

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/pages/${stringifiedQuery}&depth=2`,
        {
            next: {
                tags: [tag]
            }
        }
    );

    if (res.status !== 200) notFound();

    return res.json();
}

export default async function Page({params, searchParams}: { params: { slug: string[] }, searchParams?:{draft?:string; secret?:string} }) {
    const slug = params.slug;
    const secret = searchParams?.secret;
    const res = await getData({
        slug: {
            equals: slug[slug.length - 1]
        }
    }, "pages_");
    const data = res.docs[0];
    const meta = await getMeta();

    if (!data) notFound();

    if (secret === process.env.NEXT_PUBLIC_DRAFT_SECRET){
        return (
            <PageClient meta={meta} initialPage={data}/>
        )
    }

    return (
        <PageContent meta={meta} data={data}/>
    );
}
