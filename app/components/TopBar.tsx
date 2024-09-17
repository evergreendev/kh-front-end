import Link from "next/link";
import Image from "next/image";
import MegaMenu from "@/app/components/MegaMenu";
import Button, {buttonConfig} from "@/app/components/Button";
import React from "react";
import {Navigation, SiteOption} from "@/app/types/payloadTypes";
import Index from "@/app/components/Search";

const TopBar = ({siteOption, nav}: { siteOption: SiteOption, nav: Navigation }) => {

    return <div className="flex max-w-screen-2xl w-full">
        <Link href='/' className="border-r-[3px] border-black pr-8 flex mr-8 ">
            {
                typeof siteOption.siteLogoSmall !== "number" ? <Image className="max-w-md my-3"
                                                                      src={`${siteOption.siteLogoSmall.url}`}
                                                                      alt={siteOption.siteLogoSmall.alt || ""}
                                                                      width={siteOption.siteLogoSmall.width || "0"}
                                                                      height={siteOption.siteLogoSmall.height || "0"}/>
                    : ""
            }

        </Link>

        <div className="flex flex-col">
            <MegaMenu nav={nav}/>
            <Index/>
        </div>
        <Button config={buttonConfig.highlight + " mb-5 self-start ml-auto w-64"} text="DONATE" href="/donate"/>
    </div>
}

export default TopBar;
