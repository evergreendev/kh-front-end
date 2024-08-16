"use client";
import {useLivePreview} from "@payloadcms/live-preview-react";
import {Page, SiteOption} from "@/app/types/payloadTypes";
import PageContent from "@/app/[...slug]/PageContent";

const PageClient = ({initialPage, meta}:{initialPage:Page, meta:SiteOption}) => {
    const { data } = useLivePreview({
        initialData: initialPage,
        serverURL: process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || "",
        depth: 2,
    });

    return <PageContent data={data} meta={meta}/>
}

export default PageClient;
