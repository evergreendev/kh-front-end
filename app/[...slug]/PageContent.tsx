import BreadCrumbs from "@/app/components/BreadCrumbs";
import JumpMenu from "@/app/components/JumpMenu";
import React from "react";
import TopBar from "@/app/components/TopBar";
import {Page} from "@/app/types/payloadTypes";

const PageContent = ({data, meta}: { data: Page, meta: any }) => {
    return <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TopBar meta={meta}/>
        <div>
            {
                data?.full_path &&
                <BreadCrumbs fullPath={data.full_path}/>
            }
            {
                data?.jump_menu && data.jump_menu.length > 0 && <JumpMenu items={data.jump_menu}/>
            }
        </div>
    </main>
}

export default PageContent;
