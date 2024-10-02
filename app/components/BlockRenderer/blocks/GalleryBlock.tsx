"use client"
import {Media} from "@/app/types/payloadTypes";
import Image from "next/image";
import 'photoswipe/dist/photoswipe.css'

import {Gallery, Item} from 'react-photoswipe-gallery'

export const GalleryBlock = ({block}: {
    block: {
        items?:
            | {
            image: Media;
            id?: string | null;
        }[]
            | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'gallery';
    }
}) => {
    if (!block.items) return;
    return <Gallery  id={block.id||"0"}>
        <div className="flex flex-wrap gap-3">
            {block.items.map(item => {
                return <Item key={item.id} original={item.image.url || ""}
                             thumbnail={item.image.sizes?.thumbnail?.url || ""}
                             height={item.image.height || 0}
                             width={item.image.width || 0}>
                    {({ref, open}) => (
                        <Image ref={ref} onClick={open} key={item.id} src={item.image.sizes?.thumbnail?.url || ""}
                               alt={item.image.alt || ""}
                               height={item.image.sizes?.thumbnail?.height || 0}
                               width={item.image.sizes?.thumbnail?.width || 0}/>
                    )}
                </Item>
            })}
        </div>

    </Gallery>
}