"use client"
import {Media, Page} from "@/app/types/payloadTypes";
import getUrlFromPageOrExternal from "@/app/utilities/getUrlFromPageOrExternal";
import Link from "next/link";
import Image from "next/image";
import {Fragment, useState} from "react";

const PhotoMenuBlock = ({block, tabIndex}: {
    block: {
        title?: string | null;
        external?: boolean | null;
        Relation?: {
            relationTo: 'pages';
            value: number | Page;
        } | null;
        external_url?: string | null;
        item?:
            | {
            image?: number | Media | null;
            title?: string | null;
            external?: boolean | null;
            Relation?: {
                relationTo: 'pages';
                value: number | Page;
            } | null;
            external_url?: string | null;
            id?: string | null;
        }[]
            | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'photoMenu';
    },tabIndex?: number
}) => {
    const [activeMenu, setActiveMenu] = useState<string|null>(block?.item?.[0]?.id||null);
    const linkInfo = getUrlFromPageOrExternal(block);
    return <div className="flex flex-wrap bg-gray-200">
        {
            linkInfo.isExternal
                ? <a tabIndex={tabIndex} className="w-full text-4xl hover:bg-white p-4 text-center" key={block.id} href={linkInfo.url}>{block.title}</a>
                : <Link tabIndex={tabIndex} className="w-full text-4xl hover:bg-white p-4 text-center" key={block.id} href={linkInfo.url}>{block.title}</Link>
        }
        <div className="flex w-full">
            <div className="flex flex-col aspect-[4/3] grow relative">
                {
                    block.item?.map(item => {
                        if (!item.image || typeof item.image === "number") return <Fragment key={item.id}></Fragment>;

                        return <Image className={`aspect-[4/3] duration-700 object-cover w-full absolute  transition-opacity ${activeMenu === item.id ? "opacity-100":"opacity-0"} border-r-8 border-r-brand-yellow`}
                                      key={item.id} src={item.image.url || ""} alt={item.image.alt || ""}
                                      width={item.image.width || 0} height={item.image.height || 0}/>
                    })
                }
            </div>
            <div className="flex flex-col gap-3 text-2xl p-4 min-w-80">
                {
                    block.item?.map(item => {
                        const childLinkInfo = getUrlFromPageOrExternal(item);
                        if (childLinkInfo.isExternal) {
                            return <a
                                tabIndex={tabIndex}
                                className={`${activeMenu === item.id ? "font-bold":""}`}
                                onMouseEnter={() => setActiveMenu(item.id||null)} key={item.id} href={childLinkInfo.url}>{item.title}</a>
                        }
                        return <Link
                            tabIndex={tabIndex}
                            className={`${activeMenu === item.id ? "font-bold":""}`}
                            onMouseEnter={() => setActiveMenu(item.id||null)} href={childLinkInfo.url} key={item.id}>{item.title}</Link>
                    })
                }
            </div>

        </div>
    </div>
}

export default PhotoMenuBlock;
