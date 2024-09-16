"use client"
import {Media} from "@/app/types/payloadTypes";
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';


const CompareSliderBlock = ({block}:{block:{
        media1?: number | Media | null;
        media2?: number | Media | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'CompareSliderBlock';
    }}) => {
    if (!block.media1 || !block.media2 || typeof block.media2 === "number" || typeof block.media1 === "number") return <></>;

    return     <ReactCompareSlider
        changePositionOnHover={true}
        itemOne={<ReactCompareSliderImage src={block.media1.url||""}  alt="Image one" />}
        itemTwo={<ReactCompareSliderImage src={block.media2.url||""}  alt="Image two" />}
    />
}

export default CompareSliderBlock;
