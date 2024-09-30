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
    if(images.length === 0){
        return <div className="w-full bg-pale-1 p-8 text-center font-ptserif">
            <h2 className="text-3xl font-bold underline underline-offset-8 decoration-brand-yellow mb-4 decoration-4">{headerText}</h2>
            <p className="text-2xl font-opensans">
                {bodyText}
            </p>
        </div>
    }

    return <div className="max-h-screen max-w-full relative w-full">
        {images.length === 1
            ? <div className="flex w-full"><Image style={{maxWidth:`${(images[0].width||0)*2}px`,objectPosition: `${images[0].focalX}% ${images[0].focalY}%`}} className="max-h-[80vh] w-full object-cover grow" src={images[0].url || ""} alt={images[0].alt || ""} width={images[0].width || 0}
                          height={images[0].height || 0} key={images[0].url}/></div>
            :         <Slider  {...sliderSettings}>
                {
                    images.map(img => {
                        return <Image src={img.url || ""} alt={img.alt || ""} width={img.width || 0}
                                      height={img.height || 0} key={img.url}/>
                    })
                }
            </Slider>}
        <div className="absolute bottom-0 left-72 w-full max-w-[29rem] p-8 bg-white text-center font-ptserif">
            <h2 className="text-3xl font-bold underline underline-offset-8 decoration-brand-yellow mb-4 decoration-4">{headerText}</h2>
            <p className="text-2xl font-opensans">
                {bodyText}
            </p>
        </div>
    </div>
}

export default ImageSlider;
