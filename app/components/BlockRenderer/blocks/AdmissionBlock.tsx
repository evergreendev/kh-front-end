"use client"
import {
    Event,
    EventCat,
    Impact,
    MuseumCollection,
    Passion,
    StudentSpotlight,
    Support,
    Page
} from "@/app/types/payloadTypes";
import {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import MaybeLinkWrapper from "@/app/components/MaybeLinkWrapper";
import {getSlugFromCollection} from "@/app/components/BlockRenderer/blocks/blockHelpers";
import {getCurrentAdmission, getFutureAdmissions} from "@/app/utilities/admission";
import renderText from "@/app/components/BlockRenderer/utils/renderText";

const AdmissionBlock = ({block}: {
    block: {
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
        blockType: 'AdmissionBlock';
    }
}) => {
    useEffect(() => {
        async function getData() {
            const hoursRes = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/globals/admission?locale=undefined&draft=false&depth=1`,
                {
                    next: {
                        tags: ["siteOptions_"]
                    }
                })

            const res = await hoursRes.json();

            setData(res);
        }

        getData();
    }, []);
    const [data, setData] = useState(null);

    let admissionsToShow;

    if (!data) return <Skeleton height={24}/>

    if (!block.showAllFuture) {
        admissionsToShow = getCurrentAdmission(data);
    }
    if (block.showAllFuture) {
        admissionsToShow = getFutureAdmissions(data);

        return <MaybeLinkWrapper
            className={`flex flex-wrap justify-around sm:justify-between`}
            href={block.external
                ? block.external_url
                : getSlugFromCollection(block.Relation?.value, block.Relation?.relationTo || "")}>
            {
                admissionsToShow?.map(x => {
                    const startDate = new Date(x.admission_start);
                    const endDate = new Date(x.admission_end);

                    return <div key={x.id}
                                className={`mb-2`}>
                        <h2 className="mb-3 text-2xl font-normal font-opensans undefined">{startDate.getMonth() + 1}/{startDate.getDate()}/{startDate.getFullYear()} - {endDate.getMonth() + 1}/{endDate.getDate()}/{endDate.getFullYear()}</h2>
                        <div>{renderText(x?.body?.root, 1, x?.id || "1")}</div>
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
        <div>{renderText(admissionsToShow?.body?.root, 1, admissionsToShow?.id || "1")}</div>
    </MaybeLinkWrapper>
}

export default AdmissionBlock;
