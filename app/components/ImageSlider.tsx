'use client';
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Media} from "@/app/types/payloadTypes";
import Image from "next/image";

const ImageSlider = ({images, headerText, bodyText}: { images: Media[], headerText: string, bodyText: string }) => {

    const sliderSettings = {
        dots: true,
        dotsClass: "dots",
        arrows: false,
        autoplay: true,
        draggable: true,
        speed: 700,
        autoplaySpeed: 6000,
        adaptiveHeight: false,
        slidesToScroll: 1,
        infinite: true,
    }

    return <div className="max-h-screen max-w-full relative">
        <Slider  {...sliderSettings}>
            {
                images.map(img => {
                    return <Image src={img.url || ""} alt={img.alt || ""} width={img.width || 0}
                                  height={img.height || 0} key={img.url}/>
                })
            }
        </Slider>
        <div className="absolute bottom-0 left-72 w-full max-w-[29rem] p-8 bg-white text-center font-ptserif">
            <h2 className="text-3xl font-bold underline underline-offset-8 decoration-brand-yellow mb-4 decoration-4">{headerText}</h2>
            <p className="text-2xl">
                {bodyText}
            </p>
        </div>
    </div>
}

export default ImageSlider;
