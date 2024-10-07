import {Media} from "@/app/types/payloadTypes";
import Image from "next/image";
import renderText from "@/app/components/BlockRenderer/utils/renderText";

const TimeLine = ({block}: {
    block: {
        items?:
            | {
            date?: string | null;
            title?: string | null;
            body?: {
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
            image?: number | Media | null;
            id?: string | null;
        }[]
            | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'timeline';
    }
}) => {

    return <div className="max-w-screen-xl mx-auto flex flex-col items-center">
        {
            block.items?.map((item, index) => {
                return <div key={item.id} className={`mb-16 lg:mb-0 flex ${index % 2 === 0 ? "bg-pale-2" : "bg-pale-1"} w-full flex-wrap`}>
                    <div className="flex flex-col grow p-5">
                        <p className="font-bold text-xl">{item.date}</p>
                        <h3 className="font-ptserif text-3xl mb-2">{item.title}</h3>
                        <div className="my-auto">{renderText(item.body?.root,0,item.id||"")}</div>
                    </div>
                    {
                        item.image && typeof item.image !== "number" ?
                            <Image className="w-1/3 grow h-auto" src={item.image.url || ""} alt={item.image.alt || ""} width={item.image.width || 0}
                                   height={item.image.height || 0}/> : ""
                    }
                </div>
            })
        }
    </div>
}

export default TimeLine;
