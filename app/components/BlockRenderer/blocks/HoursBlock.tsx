"use client"
import {getCurrentSchedule, getFutureSchedules, getHoursFromSchedule} from "@/app/utilities/hours";
import {useEffect, useState} from "react";
import {
    Event,
    EventCat,
    Impact,
    MuseumCollection,
    Passion,
    StudentSpotlight,
    Support,
    Page,
} from "@/app/types/payloadTypes";
import {getSlugFromCollection} from "@/app/components/BlockRenderer/blocks/blockHelpers";
import Skeleton from "react-loading-skeleton";
import MaybeLinkWrapper from "@/app/components/MaybeLinkWrapper";

const HoursBlock = ({block}: {
    block: {
        showAllCurrent?: boolean | null;
        showAllFuture?: boolean | null;
        centerText?: boolean | null;
        boldText?: boolean | null;
        external?: boolean | null;
        Relation?:
            | ({
            relationTo: 'pages';
            value: number | Page;
        } | null)
            | ({
            relationTo: 'museumCollections';
            value: number | MuseumCollection;
        } | null)
            | ({
            relationTo: 'impact';
            value: number | Impact;
        } | null)
            | ({
            relationTo: 'passions';
            value: number | Passion;
        } | null)
            | ({
            relationTo: 'studentSpotlight';
            value: number | StudentSpotlight;
        } | null)
            | ({
            relationTo: 'support';
            value: number | Support;
        } | null)
            | ({
            relationTo: 'event';
            value: number | Event;
        } | null)
            | ({
            relationTo: 'eventCat';
            value: number | EventCat;
        } | null);
        external_url?: string | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'HoursBlock';
    }
}) => {
    useEffect(() => {
        async function getData() {
            const hoursRes = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/globals/hours?locale=undefined&draft=false&depth=1`,
                {
                    next: {
                        tags: ["siteOptions_"]
                    }
                })

            const res =  await hoursRes.json();

            setData(res);
        }

        getData();
    }, []);
    const [data,setData] = useState(null);

    let schedulesToShow;

    if(!data) return <Skeleton height={24}/>

    if (!block.showAllFuture) {
        schedulesToShow = getCurrentSchedule(data);
    }
    if (!block.showAllCurrent && !block.showAllFuture) {
        schedulesToShow = {
            ...schedulesToShow,
            hours: [schedulesToShow?.hours?.[0]]
        };
    }

    if (block.showAllFuture) {
        schedulesToShow = getFutureSchedules(data);

        return <MaybeLinkWrapper
            className={``}
            href={block.external
                ? block.external_url
                : getSlugFromCollection(block.Relation?.value, block.Relation?.relationTo || "")}>
            {
                schedulesToShow?.map(x => {
                    const startDate = new Date(x.schedule_start);
                    const endDate = new Date(x.schedule_end);

                    return <div key={x.id}
                                className={`mb-2 ${block.centerText ? "text-center flex flex-col items-center" : ""} ${block.boldText ? "font-bold" : ""}`}>
                        <h2>{startDate.getMonth() + 1}/{startDate.getDate()}/{startDate.getFullYear()}-{endDate.getMonth() + 1}/{endDate.getDate()}/{endDate.getFullYear()}</h2>
                        {x.hours?.map(hour => {
                            return <h3 key={hour.id}
                                       className="text-xl mb-2">{hour.title} {hour.hour_start ? ` - ${getHoursFromSchedule(hour)}` : ``}</h3>
                        })}
                    </div>
                })
            }
        </MaybeLinkWrapper>
    }

    return <MaybeLinkWrapper
        className={``}
        href={block.external
            ? block.external_url
            : getSlugFromCollection(block.Relation?.value, block.Relation?.relationTo || "")}>
        {
            schedulesToShow?.hours?.map(hour => {
                if (!hour) return null;

                return <div
                    className={`mb-2 ${block.centerText ? "text-center flex flex-col items-center" : ""} ${block.boldText ? "font-bold" : ""}`}
                    key={hour.id}>
                    {schedulesToShow.hours.length !== 1 ?
                        <h3 className="text-xl mb-2">{hour.title} {hour.hour_start ? ` - ${getHoursFromSchedule(hour)}` : ``}</h3> :
                        <div className='flex items-center text-xl mb-7'>Open Today: {getHoursFromSchedule(hour)}</div>}
                </div>
            })
        }
    </MaybeLinkWrapper>
}

export default HoursBlock;
