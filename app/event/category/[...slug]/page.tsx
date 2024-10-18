import qs from "qs";
import React from "react";
import {notFound} from "next/navigation";
import getMeta from "@/app/data/getMeta";
import CategoryPageClient from "@/app/event/category/[...slug]/categoryPage.client";
import CategoryPageContent from "@/app/event/category/[...slug]/CategoryPageContent";

async function getData(query: any, tag: string) {
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
    }, "eventCat_");
    const data = res.docs[0];
    const meta = await getMeta();

    if (!data) notFound();

    if (secret === process.env.NEXT_PUBLIC_DRAFT_SECRET){
        return (
            <CategoryPageClient meta={meta} initialPage={data}/>
        )
    }

    return (
        <CategoryPageContent meta={meta} data={data}/>
    );
}
