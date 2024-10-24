"use client"
import React from "react";
import NeedsWindow from "@/app/components/NeedsWindow";
import {Media} from "@/app/types/payloadTypes";
import Image from "next/image";

const Video = ({src, thumbnail}: { src: string, thumbnail?: Media | null }) => {
    return <div className="aspect-video relative bg-slate-300"><NeedsWindow>
        <video className="z-20 relative aspect-video w-full" width="320" height="245" autoPlay muted loop playsInline>
            <source src={src} type="video/mp4"/>
        </video>
        {
            thumbnail
                ? <Image className="z-10 absolute inset-0 w-full h-full aspect-video object-fill" priority={true} src={thumbnail.url || ""}
                         width={thumbnail.width || 0} height={thumbnail.height || 0}
                         alt={thumbnail.alt || ""}/>
                : null
        }
    </NeedsWindow></div>
}

export default Video;
