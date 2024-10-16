import {getCurrentSchedule, getFutureSchedules, getHoursFromSchedule} from "@/app/utilities/hours";
import {ReactNode} from "react";
import {className} from "postcss-selector-parser";
import Link from "next/link";
import {
    Event,
    EventCat,
    Impact,
    MuseumCollection,
    Passion,
    StudentSpotlight,
    Support,
    Page,
    Hour
} from "@/app/types/payloadTypes";
import {getSlugFromCollection} from "@/app/components/BlockRenderer/blocks/blockHelpers";


async function getData() {
    const hoursRes = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/globals/hours?locale=undefined&draft=false&depth=1`,
        {
            next: {
                tags: ["siteOptions_"]
            }
        })

    return await hoursRes.json();
}

const MaybeLinkWrapper = ({children, href, isExternal,className}:{children:ReactNode,href?:string|null,isExternal?:boolean|null,className?:string|null}) => {
    if (!href) return <div className={className||""}>
            {children}
        </div>
    if (isExternal) return <a className={className||""} href={href}>{children}</a>

    return <Link href={href} className={className||""}>{children}</Link>
}

const HoursBlock = async ({block}: {
    block: {
        showAllCurrent?: boolean | null;
        showAllFuture?: boolean | null;
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
    const data = await getData();
    let schedulesToShow;

    if (!block.showAllFuture) {
        schedulesToShow = getCurrentSchedule(data);
    }
    if (!block.showAllCurrent && !block.showAllFuture) {
        schedulesToShow = {
            ...schedulesToShow,
            hours: [schedulesToShow?.hours?.[0]]
        };
    }

    if (block.showAllFuture){
        schedulesToShow = getFutureSchedules(data);

        return <MaybeLinkWrapper
            className={``}
            href={block.external
                ? block.external_url
                : getSlugFromCollection(block.Relation?.value, block.Relation?.relationTo||"")}>
            {
                schedulesToShow?.map(x => {
                    const startDate = new Date(x.schedule_start);
                    const endDate = new Date(x.schedule_end);

                    return <div key={x.id} className="mb-6">
                        <h2>{startDate.getMonth()+1}/{startDate.getDate()}/{startDate.getFullYear()}-{endDate.getMonth()+1}/{endDate.getDate()}/{endDate.getFullYear()}</h2>
                        {x.hours?.map(hour => {
                            return <h3 key={hour.id} className="text-xl">{hour.title} {hour.hour_start ? ` - ${getHoursFromSchedule(hour)}` : ``}</h3>
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
            : getSlugFromCollection(block.Relation?.value, block.Relation?.relationTo||"")}>
        {
            schedulesToShow?.hours?.map(hour => {
                if(!hour) return null;

                return <div className="mb-2" key={hour.id}>
                    {schedulesToShow.hours.length !== 1 ? <h3 className="text-xl">{hour.title} {hour.hour_start ? ` - ${getHoursFromSchedule(hour)}` : ``}</h3> : <div className='flex items-center text-xl mb-7'>Open Today: {getHoursFromSchedule(hour)}</div>}
                </div>
            })
        }
    </MaybeLinkWrapper>
}

export default HoursBlock;
