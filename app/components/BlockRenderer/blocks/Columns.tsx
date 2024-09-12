import {Media} from "@/app/types/payloadTypes";
import React, {Fragment} from "react";
import BlockRenderer from "@/app/components/BlockRenderer";

const widths = {
    withBorder: {
        "1/3": "md:w-[32.33333%]",
        "2/3": "md:w-[65.66666%]",
        "1/4": "md:w-[24%]",
        "1/2": "md:w-[49%]",
        "3/4": "md:w-[74%]",
    },
    noBorder: {
        "1/3": "md:w-[32.33333%]",
        "2/3": "md:w-[65.66666%]",
        "1/4": "md:w-[24%]",
        "1/2": "md:w-[49%]",
        "3/4": "md:w-[74%]",
    }
}

const Columns = ({block}:{block:{
        vertical_separator?: boolean | null;
        fullWidth?: boolean | null;
        narrowRow?: boolean | null;
        grayBackground?: boolean | null;
        columns?:
            | {
            content?:
                | (
                | {
                media?: number | Media | null;
                thumbnail?: number | Media | null;
                id?: string | null;
                blockName?: string | null;
                blockType: 'MediaBlock';
            }
                | {
                heading_1?: string | null;
                heading_2?: string | null;
                heading_link?: {
                    link?: string | null;
                    label?: string | null;
                };
                body?: {
                    text?: {
                        root: {
                            type: string;
                            children: {
                                type: string;
                                version: number;
                                [k: string]: unknown;
                            }[];
                            direction: ('ltr' | 'rtl') | null;
                            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                            indent: number;
                            version: number;
                        };
                        [k: string]: unknown;
                    } | null;
                    link_list?:
                        | {
                        link?: string | null;
                        label?: string | null;
                        id?: string | null;
                    }[]
                        | null;
                };
                id?: string | null;
                blockName?: string | null;
                blockType: 'TextBlock';
            }
                )[]
                | null;
            width?: ('1/3' | '2/3' | '1/2' | '1/4' | '3/4') | null;
            id?: string | null;
        }[]
            | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'column';
    }}) => {
    if (!block.columns || !block.columns) return null;

    const currWidth = block.vertical_separator ? widths.withBorder : widths.noBorder;

    return <div className={`w-full flex flex-wrap items-center pb-12 justify-between 
    ${block.grayBackground ? "bg-gray-200" : ""}
    ${block.narrowRow && !block.fullWidth ? "max-w-screen-xl mx-auto" : ""}
    ${!block.narrowRow && !block.fullWidth ? "max-w-[1800px] px-7 mx-auto" : ""}
    `}>
        {block.columns.map((column, index: number) => {
            return <Fragment key={column.id}>
                <div className={`${currWidth[column.width||"1/4"]}`}>
                <BlockRenderer blocks={column.content}/>
            </div>
                {
                    block.vertical_separator && block.columns && index !== block.columns.length - 1
                        ? <div className="w-[2%] flex justify-around self-stretch">
                        <div className="w-[3px] bg-black"/>
                        </div>
                        : null
                }
            </Fragment>;
        })}
    </div>
}

export default Columns;
