import Link from "next/link";
import Image from "next/image";
import MegaMenu from "@/app/components/MegaMenu";
import Button, {buttonConfig} from "@/app/components/Button";
import React from "react";
import {Navigation, SiteOption} from "@/app/types/payloadTypes";
import SearchBar from "@/app/components/Search";

const TopBar = ({siteOption, nav}: { siteOption: SiteOption, nav: Navigation }) => {

    return <div className="flex flex-wrap max-w-screen-2xl w-full justify-end lg:justify-between">
        <Link href='/' className="lg:border-r-[3px] border-black lg:pr-8 flex lg:mr-8 mx-auto sm:mx-0 grow md:grow-0">
            {
                typeof siteOption.siteLogoSmall !== "number" ? <Image className="max-w-md mx-auto my-3 w-full grow lg:w-96"
                                                                      src={`${siteOption.siteLogoSmall.url}`}
                                                                      alt={siteOption.siteLogoSmall.alt || ""}
                                                                      width={siteOption.siteLogoSmall.width || "0"}
                                                                      height={siteOption.siteLogoSmall.height || "0"}/>
                    : ""
            }

        </Link>

        <div className="flex flex-col ml-auto mb-4 lg:mb-0 lg:ml-0 w-full sm:w-auto items-end lg:items-start">
            <MegaMenu nav={nav}/>
            <div className="mt-auto hidden lg:block">
                <SearchBar/>
            </div>

        </div>
        <div className="ml-auto">
            <Button config={buttonConfig.highlight + " mb-5 self-start ml-auto w-64  text-center justify-around"} text="DONATE" href="https://donate.crazyhorsememorial.org/"/>
        </div>
    </div>
}

export default TopBar;
