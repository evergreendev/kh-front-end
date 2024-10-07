import React from "react";
import TopBar from "@/app/components/TopBar";
import {Media, Event} from "@/app/types/payloadTypes";
import Footer from "@/app/components/Footer";
import BlockRenderer from "@/app/components/BlockRenderer";
import ImageSlider from "@/app/components/ImageSlider";
import renderText from "@/app/components/BlockRenderer/utils/renderText";


function getEventDate(startDate?:string|null, endDate?:string|null, onlyMonth?:boolean|null):string{
    const monthArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    if(!startDate) return "";
    const startDateObj = new Date(Date.parse(startDate));
    const endDateObj = endDate ? new Date(Date.parse(endDate)) : null;
    const startAndEndMonthTheSame = startDateObj.getMonth() === endDateObj?.getMonth();

    if(onlyMonth){
        return (monthArr[startDateObj.getMonth()]) + (endDateObj && !startAndEndMonthTheSame ? " - "+monthArr[endDateObj.getMonth()] : "") +":";
    }

    if (startAndEndMonthTheSame){
        return (monthArr[startDateObj.getMonth()] + " " + startDateObj.getDate()) + " - " + endDateObj?.getDate() + ":";
    }

    if (!endDateObj){
        return (monthArr[startDateObj.getMonth()] + " " + startDateObj.getDate()) + ":";
    }

    return (monthArr[startDateObj.getMonth()] + " " + startDateObj.getDate()) + " - " + monthArr[endDateObj.getMonth()] + " " +endDateObj?.getDate() + ":";
}

const PageContent = ({data, meta}: { data: Event, meta: any }) => {
    return <main className="flex min-h-screen flex-col items-center w-full">
        <div className="px-24 py-7 flex flex-col items-center w-full">
            <TopBar siteOption={meta.siteOptions} nav={meta.nav}/>
        </div>
        <ImageSlider headerText={data.intro_content?.header||data.title} bodyText={data.intro_content?.content||""} images={data.intro_content?.images?.filter((image): image is { media: Media, id: string } => {
            return !!image.media && typeof image.media !== "number"
        }).map(image => {
            return image.media
        }) || []}/>
        <div className="w-full pt-12">
            <BlockRenderer blocks={data.layout}/>
            <div className="max-w-[58ch] mx-auto text-xl">
                {
                    data.schedule?.map(item => {
                        return <div key={item.id} className="mb-4">
                            <p>
                                <span
                                    className="font-bold">{getEventDate(item.startDate, item.endDate, item.onlyMonth)}</span> {item.title}
                            </p>
                            {
                                item.description?.root ? renderText(item.description.root,1,item.id||"") : ""
                            }
                        </div>
                    })
                }
            </div>

        </div>
        <Footer footer={meta.footer}/>
    </main>
}

export default PageContent;
