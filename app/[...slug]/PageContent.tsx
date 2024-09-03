import BreadCrumbs from "@/app/components/BreadCrumbs";
import JumpMenu from "@/app/components/JumpMenu";
import React from "react";
import TopBar from "@/app/components/TopBar";
import {Page} from "@/app/types/payloadTypes";
import Footer from "@/app/components/Footer";

const PageContent = ({data, meta}: { data: Page, meta: any }) => {
    return <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="p-24 flex min-h-screen flex-col items-center">
            <TopBar siteOption={meta.siteOptions} nav={meta.nav}/>
            <div>
                {
                    data?.full_path &&
                    <BreadCrumbs fullPath={data.full_path}/>
                }
                {
                    data?.jump_menu && data.jump_menu.length > 0 && <JumpMenu items={data.jump_menu}/>
                }
            </div>
        </div>
        <Footer footer={meta.footer}/>
    </main>
}

export default PageContent;
