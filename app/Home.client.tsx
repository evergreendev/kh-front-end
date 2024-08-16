'use client';
import { useLivePreview } from '@payloadcms/live-preview-react';
import { Page } from "@/app/types/payloadTypes";
import React from "react";
import HomeLayout from "@/app/HomeLayout";


export const HomeClient: React.FC<{
    page: Page,
    meta: any
}> = ({ page: initialPage, meta: meta }) => {
    const { data } = useLivePreview({
        initialData: initialPage,
        serverURL: process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || "",
        depth: 2,
    })

    return <HomeLayout data={data} meta={meta}/>
}
