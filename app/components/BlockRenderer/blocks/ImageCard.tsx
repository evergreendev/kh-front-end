import {Media} from "@/app/types/payloadTypes";
import Image from "next/image";
import renderText from "@/app/components/BlockRenderer/utils/renderText";

const ImageCard= ({block}:{block:{
        image?: number | Media | null;
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
        reverse?: boolean | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'ImageCard';
    }}) => {
    const img = block.image as Media;
    if (block.reverse) return <div className="flex flex-wrap bg-gray-100 max-w-[1800px] mb-14 justify-between mx-auto">
        <div className="w-full md:w-5/12 p-6 text-center self-center grow">
            {renderText(block.text?.root, 0, block.id || "")}
        </div>
        {
            img ? <Image style={{objectPosition: `${img.focalX}% ${img.focalY}%`}}
                         className="aspect-video object-cover w-6/12 grow" src={img.url || ""} alt={img.alt || ""}
                         width={img.width || 0} height={img.height || 0}/> : ""
        }
    </div>

    return <div className="flex flex-wrap bg-gray-100 max-w-[1800px] mb-14 justify-between mx-auto">
        {
            img ? <Image style={{objectPosition: `${img.focalX}% ${img.focalY}%`}}
                         className="aspect-video object-cover w-6/12 grow" src={img.url || ""} alt={img.alt || ""}
                         width={img.width || 0} height={img.height || 0}/> : ""
        }
        <div className="w-full md:w-5/12 p-6 text-center self-center grow">
            {renderText(block.text?.root, 0, block.id || "")}
        </div>

    </div>
}

export default ImageCard;
