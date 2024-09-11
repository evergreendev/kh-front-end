import BreadCrumbs from "@/app/components/BreadCrumbs";
import JumpMenu from "@/app/components/JumpMenu";
import React from "react";
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
import {getCurrentSchedule, getHoursFromSchedule} from "@/app/utilities/hours";
import {Page} from "@/app/types/payloadTypes";
import Video from "@/app/components/Video";
import {Meta} from "@/app/types/types";
import Footer from "@/app/components/Footer";
import MegaMenu from "@/app/components/MegaMenu";
import BlockRenderer from "@/app/components/BlockRenderer";

const SideBar = ({meta}: { meta: Meta }) => {

    const currentSchedule = getCurrentSchedule(meta.hours);

    return <div className="border-r-[3px] border-black pr-8">
        {
            typeof meta.siteOptions.siteLogo !== "number" ?
                <Image className="max-w-md mb-16" src={`${meta.siteOptions.siteLogo.url}`}
                       alt={meta.siteOptions.siteLogo.alt || ""}
                       width={meta.siteOptions.siteLogo.width || 100}
                       height={meta.siteOptions.siteLogo.height || 100}/> : ""
        }

        <div className="mb-32">
            <div className="flex items-center text-xl mb-7">
                <FontAwesomeIcon className="size-5 mr-6" icon={faClock} size="sm"/>
                Open Today: {currentSchedule?.hours?.[0] ? getHoursFromSchedule(currentSchedule.hours[0]) : ""}
            </div>
            <Link className="flex items-center text-xl mb-7"
                  href={`/plan-your-visit/information/pricing-and-admission`}>
                <FontAwesomeIcon transform={{rotate: 5}} className="size-5 mr-6" icon={faTicket} size="sm"/>
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
                    <Link className="underline" href={`/plan-your-visit/information/getting-to-crazy-horse`}>more
                        direction
                        information</Link>
                </address>
            </div>
        </div>
        <Button config={buttonConfig.primary + " mb-5 w-full"} text="Plan Your Visit" href="/plan-your-visit"
                icon={faChevronCircleRight}/>
        <Button config={buttonConfig.primary + " mb-5 w-full"} text="Book Tickets" href="/plan-your-visit/buy-tickets"
                icon={faChevronCircleRight}/>
        <div className="flex gap-6">
            <a href="https://www.facebook.com/crazyhorsememorial">
                <FontAwesomeIcon className="size-14 text-gray-800" icon={faFacebookSquare}/>
            </a>
            <a href="https://x.com/CrazyHorseMem"><FontAwesomeIcon className="size-14" icon={faSquareXTwitter}/></a>
            <a href="https://www.instagram.com/crazyhorsememorial/"><FontAwesomeIcon className="size-14 text-gray-800"
                                                                                     icon={faInstagramSquare}/></a>
            <a href="https://www.youtube.com/@CrazyHorseMemorial"><FontAwesomeIcon className="size-14"
                                                                                   icon={faYoutubeSquare}/></a>
        </div>
    </div>
}

const HomeLayout = ({data, meta}: { data: Page, meta: Meta }) => {
    return (
        <main className="flex min-h-screen flex-col justify-between">
            <div className="flex flex-wrap w-full mb-4 max-w-top ml-auto mt-4 pl-7">
                <SideBar meta={meta}/>
                <div className="font-ptserif mx-auto grow pl-10">
                    <div className="flex justify-between items-start max-w-screen-xl">
                        <div className="flex flex-col justify-start gap-2">
                            <MegaMenu nav={meta.nav}/>
                            <div className="flex">Search</div>{/*todo add search bar*/}
                        </div>
                        <Button text="DONATE" href="/donate" config={buttonConfig.highlight}/>
                    </div>
                    {
                        data.intro_content?.video ?
                            <div className="w-full">
                                <Video src={data.intro_content?.video}
                                       thumbnail={typeof data.intro_content?.thumbnail !== "number" ? data.intro_content?.thumbnail?.url : ""}/>
                            </div> :
                            ""
                    }
                    <div className="w-full mx-auto max-w-screen-lg mt-6 text-center">
                        <div className="flex justify-center mx-auto">
                            <h2 className="text-4xl font-bold border-b-brand-yellow border-b-4">{data.intro_content?.header}</h2>
                        </div>
                        <p className="text-3xl font-normal">
                            {data.intro_content?.content}
                        </p>
                    </div>

                </div>
                <div className="flex w-full mt-6">
                    <div className="max-w-md w-full flex items-center mr-14">
                        <BreadCrumbs fullPath={data?.full_path || ""}/>
                    </div>

                    {
                        data?.jump_menu && <JumpMenu items={data.jump_menu}/>
                    }
                </div>
                <div className="w-full pr-16 pt-16">
                    <BlockRenderer blocks={data.layout}/>
                </div>
            </div>
            <Footer footer={meta.footer}/>
        </main>
    );
}

export default HomeLayout;
