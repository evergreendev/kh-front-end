"use client"
import React from "react";
import NeedsWindow from "@/app/components/NeedsWindow";
import ReactPlayer from "react-player";
import Image from "next/image";
import PlayButton from "@/public/play-button.svg";

const Video =  ({src,thumbnail}:{src:string,thumbnail?:string|null}) => {
    return <div className="aspect-video"><NeedsWindow>
        <ReactPlayer width="100%" height="100%"
                     playIcon={<Image className="group-hover:opacity-100 size-14 xl:size-52 transition-opacity opacity-70"
                                      src={PlayButton} alt="Play"/>} controls={true}
                     light={thumbnail || ""}
                     url={src || ""}/>
    </NeedsWindow></div>
}

export default Video;
