import BreadCrumbs from "@/app/components/BreadCrumbs";
import JumpMenu from "@/app/components/JumpMenu";
import React from "react";
import TopBar from "@/app/components/TopBar";
import {Media, Page} from "@/app/types/payloadTypes";
import Footer from "@/app/components/Footer";
import BlockRenderer from "@/app/components/BlockRenderer";
import ImageSlider from "@/app/components/ImageSlider";

const PageContent = ({data, meta}: { data: Page, meta: any }) => {
    return <main className="flex min-h-screen flex-col items-center w-full">
        <div className="px-24 py-7 flex flex-col items-center w-full">
            <TopBar siteOption={meta.siteOptions} nav={meta.nav}/>
        </div>
        <ImageSlider headerText={data.intro_content?.header||data.title} bodyText={data.intro_content?.content||""} images={data.intro_content?.images?.filter((image): image is { media: Media, id: string } => {
            return !!image.media && typeof image.media !== "number"
        }).map(image => {
            return image.media
        }) || []}/>
        <div className="px-24 py-7 flex flex-col items-center w-full">
            <div className="flex max-w-[calc(1800px-3.5rem)] w-full justify-between">
                {
                    data?.full_path &&
                    <BreadCrumbs fullPath={data?.full_path}/>
                }
                {
                    data?.jump_menu && data.jump_menu.length > 0 && <JumpMenu items={data.jump_menu}/>
                }
            </div>
        </div>
        <div className="w-full pt-16">
            <BlockRenderer blocks={data.layout}/>
        </div>
        <Footer footer={meta.footer}/>
    </main>
}

export default PageContent;
