import Link from "next/link";
import Image from "next/image";
import MegaMenu from "@/app/components/MegaMenu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@awesome.me/kit-2a2dc088e2/icons/classic/regular";
import Button, {buttonConfig} from "@/app/components/Button";
import React from "react";

const TopBar = ({meta}:{meta:any}) => {

    return <div className="flex max-w-screen-2xl w-full">
        <Link href='/' className="border-r-[3px] border-black pr-8 flex mr-8 ">
            <Image className="max-w-md my-3"
                   src={`${meta.siteLogoSmall.url}`}
                   alt={meta.siteLogoSmall.alt}
                   width={meta.siteLogoSmall.width} height={meta.siteLogoSmall.height}/>
        </Link>

        <div className="flex flex-col">
            <MegaMenu/>
            <div className="flex items-center text-xl mt-auto">
                <FontAwesomeIcon className="size-5 mr-6" icon={faClock} size="sm"/>
            </div>
        </div>
        <Button config={buttonConfig.highlight + " mb-5 w-full self-start ml-auto w-64"} text="DONATE" href="/donate"/>
    </div>
}

export default TopBar;
