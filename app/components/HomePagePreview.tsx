'use client';
import { useLivePreview } from '@payloadcms/live-preview-react';
import { Page } from "@/app/types/payloadTypes";
import JumpMenu from "@/app/components/JumpMenu";
import React from "react";
import BreadCrumbs from "@/app/components/BreadCrumbs";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faTicket} from "@awesome.me/kit-2a2dc088e2/icons/classic/regular";
import Link from "next/link";
import {faChevronCircleRight} from "@awesome.me/kit-2a2dc088e2/icons/classic/thin";
import {faLocationDot, faPhoneVolume} from "@awesome.me/kit-2a2dc088e2/icons/classic/solid";
import Button, {buttonConfig} from "@/app/components/Button";
import {
    faFacebookSquare,
    faInstagramSquare,
    faSquareXTwitter,
    faYoutubeSquare
} from "@awesome.me/kit-2a2dc088e2/icons/classic/brands";

const SideBar = ({meta}:{meta: any}) => {
    return <div className="border-r-[3px] border-black pr-8">
        <Image className="max-w-md mb-16" src={`${meta.siteLogo.url}`} alt={meta.siteLogo.alt}
               width={meta.siteLogo.width} height={meta.siteLogo.height}/>
        <div className="mb-32">
            <div className="flex items-center text-xl mb-7">
                <FontAwesomeIcon className="size-5 mr-6" icon={faClock} size="sm"/>
                Open Today: 8:00am - 8:99pm {/*TODO UPDATE THIS TO PULL FROM THE BACKEND*/}
            </div>
            <Link className="flex items-center text-xl mb-7" href={`/plan-your-visit/information/pricing-and-admission`}>
                <FontAwesomeIcon transform={{rotate:5}} className="size-5 mr-6" icon={faTicket} size="sm"/>
                <p>Admission:</p>
                <FontAwesomeIcon className="size-5 ml-2" icon={faChevronCircleRight}/>
            </Link>
            <a className="flex items-center text-xl mb-7" href="tel:605-673-4681">
                <FontAwesomeIcon className="size-5 mr-6" icon={faPhoneVolume}/>
                Call: 605.673.4681
            </a>
            <div className="flex items-start text-xl mb-7">
                <FontAwesomeIcon className="size-6 mr-5 mt-1" icon={faLocationDot}/>
                <address className="not-italic">
                    Crazy Horse Memorial<br/>
                    12151 Avenue of the Chiefs<br/>
                    Crazy Horse, SD 57730-8900<br/>
                    <Link className="underline" href={`/plan-your-visit/information/getting-to-crazy-horse`}>more direction
                        information</Link>
                </address>
            </div>
        </div>
        <Button config={buttonConfig.primary + " mb-5 w-full"} text="Plan Your Visit" href="/plan-your-visit" icon={faChevronCircleRight}/>
        <Button config={buttonConfig.primary + " mb-5 w-full"} text="Book Tickets" href="/plan-your-visit/buy-tickets" icon={faChevronCircleRight}/>
        <div className="flex gap-6">
            <a href="https://www.facebook.com/crazyhorsememorial">
                <FontAwesomeIcon className="size-14 text-gray-800" icon={faFacebookSquare}/>
            </a>
            <a href="https://x.com/CrazyHorseMem"><FontAwesomeIcon className="size-14" icon={faSquareXTwitter}/></a>
            <a href="https://www.instagram.com/crazyhorsememorial/"><FontAwesomeIcon className="size-14 text-gray-800" icon={faInstagramSquare}/></a>
            <a href="https://www.youtube.com/@CrazyHorseMemorial"><FontAwesomeIcon className="size-14" icon={faYoutubeSquare}/></a>
        </div>
    </div>
}

export const HomePagePreview: React.FC<{
    page: Page,
    meta: any
}> = ({ page: initialPage, meta: meta }) => {
    const { data } = useLivePreview({
        initialData: initialPage,
        serverURL: process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL || "",
        depth: 2,
    })

    return (
        <main className="flex min-h-screen flex-col justify-between p-24">
            <div className="flex w-full mb-4">
                <SideBar meta={meta}/>
            </div>
            {

            }
            <div className="flex w-full max-w-screen-2xl justify-between">
                {
                    data?.full_path && <BreadCrumbs fullPath={data.full_path}/>
                }
                {
                    data?.jump_menu && <JumpMenu items={data.jump_menu}/>
                }
            </div>
        </main>
    )
}
