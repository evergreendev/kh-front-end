"use client"
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import React from "react";

const Video =  ({src,thumbnail}:{src:string,thumbnail?:string|null}) => {
    const finalSrc = src.includes(".com") ? src.substring(src.indexOf("=")+1, src.length) : src;
    return <LiteYouTubeEmbed
        params="rel=0"
        id={finalSrc}
        thumbnail={thumbnail||undefined}
        title="Crazy Horse Memorial Intro Video"
    />
}

export default Video;
