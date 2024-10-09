"use client"
import React from "react";
import NeedsWindow from "@/app/components/NeedsWindow";

const Video =  ({src}:{src:string}) => {
    return <div className="aspect-video"><NeedsWindow>
        <video className="aspect-video w-full" width="320" height="245" autoPlay muted loop playsInline>
            <source src={src} type="video/mp4"/>
        </video>
    </NeedsWindow></div>
}

export default Video;
