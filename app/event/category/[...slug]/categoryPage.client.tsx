"use client";
import {useLivePreview} from "@payloadcms/live-preview-react";
import {Page} from "@/app/types/payloadTypes";
import {Meta} from "@/app/types/types";
import CategoryPageContent from "@/app/event/category/[...slug]/CategoryPageContent";

const CategoryPageClient = ({initialPage, meta}:{initialPage:Page, meta:Meta}) => {
    const { data } = useLivePreview({
        initialData: initialPage,
        serverURL: process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || "",
        depth: 2,
    });

    return <CategoryPageContent data={data} meta={meta}/>
}

export default CategoryPageClient;
