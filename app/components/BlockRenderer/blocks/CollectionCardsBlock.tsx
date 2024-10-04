"use client"
import qs from "qs";
import {useEffect, useState} from "react";
import { MuseumCollection, Page} from "@/app/types/payloadTypes";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {getImage, getSlugFromCollection} from "@/app/components/BlockRenderer/blocks/blockHelpers";

async function getData(query: any, tag: string, collectionSlug: string, page: string, limit: string) {
    const stringifiedQuery = qs.stringify(
        {
            where: query,
        },
        {
            addQueryPrefix: true
        }
    );

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/${collectionSlug}/?${stringifiedQuery}&depth=2&limit=${limit}&page=${page}&sort=-updatedAt`,
        {
            next: {
                tags: [tag]
            }
        }
    );

    if (res.status !== 200) return null;

    const json = await res.json();

    return {...json, collectionSlug};
}

const CollectionCardsBlock = ({block}: {
    block: {
        numberOfItemsToShow?: number | null;
        type?: ('slider' | 'blocks') | null;
        collectionsToPull?: ('pages' | 'events' | 'museumCollections') | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'collectionCards';
    }
}) => {
    const [collectionItems, setCollectionItems] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function getAllCollections() {
            if (!block.collectionsToPull) {
                setIsLoading(false);
                return null;
            }

            /*const allRes = await Promise.all(block.collectionsToPull?.map(async slug => {
                return await getData({}, slug + "_", slug, "1");
            }))
            console.log(allRes);

            const items = allRes.flatMap(item => item.docs.map((x: any) => {
                return {...x, collectionSlug: item.collectionSlug}
            })).sort((a, b) => Date.parse(b.updatedAt) < Date.parse(a.updatedAt) ? 1 : 0);*/

            const res = await getData({}, block.collectionsToPull + "_", block.collectionsToPull, "1", `${block.numberOfItemsToShow || 3}`);

            setCollectionItems(
                res.docs
            )
            setIsLoading(false);

            /*setCollectionItems(items.slice(0, block.numberOfItemsToShow || 3));*/
        }

        getAllCollections();

    }, [block.collectionsToPull, block.numberOfItemsToShow]);
    const skeletonArr: any[] = [];
    const numberOfItemsToShow = block.numberOfItemsToShow || 3;
    for (let i = 0; i < numberOfItemsToShow; i++) {
        skeletonArr.push(i);
    }


    if (isLoading) return block.type === "blocks" ?
        <div className="max-w-full w-full gap-6 relative flex flex-wrap justify-around">
            {
                skeletonArr.map(x => {
                    return <div className="w-full group sm:w-3/12 h-full relative overflow-hidden"
                                key={x}>
                        <p className="bg-pale-1 z-10 text-black text-xl p-4 absolute bottom-0 left-0 right-0 text-center italic bg-opacity-90">
                            <Skeleton/></p>
                        {
                            <Skeleton
                                className="aspect-square group-hover:scale-110 duration-1000 transition-all object-cover object-center"
                            />
                        }
                    </div>
                })
            }
        </div>
        : <div className="max-w-full w-96 relative">
            <div className="aspect-[3/4] object-cover object-center"><Skeleton
                className="aspect-[3/4] object-cover object-center block"
                containerClassName="aspect-[3/4] object-cover object-center block"/></div>
        </div>;

    if (!block.collectionsToPull || !collectionItems) return null;

    if (block.type === "slider") {
        const sliderSettings = {
            dots: false,
            arrows: true,
            autoplay: true,
            draggable: true,
            speed: 700,
            autoplaySpeed: 9000,
            adaptiveHeight: true,
            slidesToScroll: 1,
            infinite: true,
        }
        return (
            <div className="max-w-full w-96 relative">
                <Slider {...sliderSettings}>{
                    collectionItems.map((collectionItem: (Page | MuseumCollection)) => {/*todo add event*/
                        const image = getImage(collectionItem);
                        return <Link href={getSlugFromCollection(collectionItem, block.collectionsToPull || "")}
                                     className="w-full h-full relative" key={collectionItem.id}>
                            <p className="bg-pale-1 text-black text-xl p-4 absolute bottom-0 left-0 right-0 text-center italic bg-opacity-90">{collectionItem.title}</p>
                            {
                                image ? <Image style={{objectPosition: `${image.focalX}% ${image.focalY}%`}} className="aspect-[3/4] object-cover" src={image.url || ""}
                                               alt={image.alt || ""} width={image.width || 0}
                                               height={image.height || 0}/> :
                                    <div className="aspect-[3/4] object-cover object-center bg-pale-2"/>
                            }
                        </Link>
                    })
                }</Slider>
            </div>

        )
    }
    return (
        <div className="max-w-full w-full gap-6 relative flex flex-wrap justify-between">
            {
                collectionItems.map((collectionItem: (Page | MuseumCollection)) => {/*todo add event*/
                    const image = getImage(collectionItem);
                    return <Link href={getSlugFromCollection(collectionItem, block.collectionsToPull || "")}
                                 className="w-full bg-gray-100 group sm:w-[30%] relative overflow-hidden"
                                 key={collectionItem.id}>
                        {
                            image ? <div className="overflow-hidden"><Image
                                style={{objectPosition: `${image.focalX}% ${image.focalY}%`}}
                                className="aspect-[4/3] group-hover:scale-110 duration-1000 transition-all object-cover object-center"
                                src={image.url || ""}
                                alt={image.alt || ""} width={image.width || 0}
                                height={image.height || 0}/></div> : <div
                                className="aspect-square group-hover:scale-110 bg-pale-2 duration-1000 transition-all object-cover object-center"/>
                        }
                        <div className="py-7 px-3">
                            <h2
                                className="mb-6 text-center text-4xl font-bold underline underline-offset-8 decoration-brand-yellow decoration-4 font-ptserif">{collectionItem.title}</h2>
                            {
                                collectionItem.excerpt ? <p className="text-center">
                                    {collectionItem.excerpt} <span className="underline italic">More</span>
                                </p> : ""
                            }
                        </div>

                    </Link>
                })
            }
        </div>
    )
}

export default CollectionCardsBlock;
