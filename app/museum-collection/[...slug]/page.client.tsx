"use client";
import {useLivePreview} from "@payloadcms/live-preview-react";
import {Page} from "@/app/types/payloadTypes";
import PageContent from "@/app/museum-collection/[...slug]/PageContent";
import {Meta} from "@/app/types/types";

const PageClient = ({initialPage, meta}:{initialPage:Page, meta:Meta}) => {
    const { data } = useLivePreview({
        initialData: initialPage,
        serverURL: process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || "",
        depth: 2,
    });

    return <PageContent data={data} meta={meta}/>
}

export default PageClient;
