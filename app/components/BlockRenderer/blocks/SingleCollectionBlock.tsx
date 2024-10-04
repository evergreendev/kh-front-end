import {Impact, MuseumCollection, Passion, StudentSpotlight, Page} from "@/app/types/payloadTypes";
import Link from "next/link";
import {getImage, getSlugFromCollection} from "@/app/components/BlockRenderer/blocks/blockHelpers";
import Image from "next/image";

const SingleCollectionBlock = ({block}: {
    block: {
        type?: ('vertical' | 'horizontal') | null;
        collection:
            | {
            relationTo: 'pages';
            value: Page;
        }
            | {
            relationTo: 'museumCollections';
            value: MuseumCollection;
        }
            | {
            relationTo: 'impact';
            value: Impact;
        }
            | {
            relationTo: 'passions';
            value: Passion;
        }
            | {
            relationTo: 'studentSpotlight';
            value: StudentSpotlight;
        };
        id?: string | null;
        blockName?: string | null;
        blockType: 'singleCollectionBlock';
    }
}) => {
    if (!block.collection) return null;

    if (block.type === "horizontal") {
        const img = getImage(block.collection.value);
        return <div className="flex bg-gray-100 max-w-screen-xl justify-between mx-auto">
            <div className="w-5/12 p-6 text-center self-center grow">
                <h2 className="mb-6 text-4xl font-bold underline underline-offset-8 decoration-brand-yellow decoration-4 font-ptserif">{block.collection.value.title}</h2>
                <p className="text-xl max-w-[38ch] text-center mx-auto">
                    {block.collection.value.excerpt||block.collection.value.intro_content?.content} <Link className="underline italic"
                                                                                                          href={getSlugFromCollection(block.collection.value, block.collection.relationTo)}>More</Link>
                </p>
            </div>
            {
                img ? <Image style={{objectPosition: `${img.focalX}% ${img.focalY}%`}} className="aspect-video object-cover w-6/12 grow" src={img.url || ""} alt={img.alt||""} width={img.width || 0} height={img.height || 0}/> : ""
            }
        </div>
    } else {
        return <div></div>/*todo add vertical*/
    }


}


export default SingleCollectionBlock;
