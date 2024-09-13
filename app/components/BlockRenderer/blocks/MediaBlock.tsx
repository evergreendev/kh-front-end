"use client"
import {Media} from "@/app/types/payloadTypes";
import Image from "next/image";
import ReactPlayer from "react-player";
import PlayButton from "@/public/play-button.svg"

const MediaBlock = ({block}: {
    block: {
        media?: number | Media | null;
        thumbnail?: number | Media | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'MediaBlock';
    }
}) => {
    if (typeof block.media === "number") return null;
    if (block.media?.mimeType?.includes("image")) {
        return <Image className="w-full" src={block.media?.url || ""} alt={block.media?.alt || ""}
                      width={block.media?.width || 0}
                      height={block.media?.height || 0}/>
    }
    return <div className="aspect-video group">
        <ReactPlayer width="100%" height="100%" playIcon={<Image className="group-hover:opacity-100 transition-opacity opacity-70" src={PlayButton} alt="Play"/>} controls={true}
                     light={typeof block.thumbnail === "number" ? "" : block.thumbnail?.url || ""}
                     url={block.media?.url || ""}/>
    </div>
}

export default MediaBlock;
