import {Media, Page} from "@/app/types/payloadTypes";
import Button from "@/app/components/Button";
import {faChevronCircleRight} from "@awesome.me/kit-2a2dc088e2/icons/classic/thin";
import Image from "next/image";
import Link from "next/link";
import {getSlugFromCollection} from "@/app/components/BlockRenderer/blocks/blockHelpers";
import {buttonConfig} from "@/app/components/ButtonConfig";

const BreakerBlock = ({block}: {
    block: {
        heading_1?: {
            text?: string | null;
            highlight?: boolean | null;
        };
        heading_2?: {
            text?: string | null;
            highlight?: boolean | null;
        };
        image?: number | Media | null;
        noButton?: boolean | null;
        button?: {
            type?: ('primary' | 'secondary' | 'highlight') | null;
            link?: {
                title?: string | null;
                external?: boolean | null;
                Relation?: {
                    relationTo: 'pages';
                    value: number | Page;
                } | null;
                external_url?: string | null;
            };
        };
        id?: string | null;
        blockName?: string | null;
        blockType: 'Breaker';
    }
}) => {

    return <div className="w-full max-w-[calc(1800px)] px-7 mx-auto text-white bg-black p-4 2xl:pr-24 mb-14">
        {
            block.noButton ?
                <Link
                    href={getSlugFromCollection((block.button?.link?.Relation?.value as Page) || "", block.button?.link?.Relation?.relationTo || "page")}
                    className={`w-full max-w-screen-2xl text-center md:text-left tracking-widest ml-auto flex flex-wrap gap-4 text-2xl ${block.image ? "justify-center items-center" : "justify-end"}`}>
                    {
                        block.heading_1 ?
                            <h2 className={`leading-relaxed text-center md:text-left ${block.heading_1.highlight ? "text-brand-yellow uppercase" : ""}`}>{block.heading_1.text}</h2> : ""
                    }
                    {
                        block.image && typeof block.image !== "number" ?
                            <Image className="size-16" src={block.image.url || ""} alt={block.image.alt || ""}
                                   width={block.image.width || 0} height={block.image.height || 0}/> : ""
                    }
                </Link> : <div
                    className={`w-full max-w-screen-2xl tracking-widest ml-auto flex flex-wrap gap-4 text-2xl ${block.image ? "justify-center items-center" : "xl:justify-end"}`}>
                    {
                        block.heading_1 ?
                            <h2 className={`leading-relaxed text-center md:text-left ${block.heading_1.highlight ? "text-brand-yellow uppercase" : ""}`}>{block.heading_1.text}</h2> : ""
                    }
                    {
                        block.heading_2?.text || block.button?.link?.external_url || block.button?.link?.Relation ?
                            <h3 className={`${block.heading_1?.text ? "max-w-[56ch]" : ""} text-center md:text-left leading-relaxed ${block.heading_2?.highlight ? "text-brand-yellow" : ""}`}>
                                <span className="mr-6">{block.heading_2?.text}</span>
                                {block.button && !block.noButton && (block.button.link?.title || block.button.link?.external_url || block.button.link?.Relation)
                                    ? <div className="inline-flex w-full md:w-96"><Button isInline icon={faChevronCircleRight}
                                              config={buttonConfig[block.button.type || "primary"]}
                                              text={block.button.link?.title || ""}
                                                   href={block.button.link?.external ? block.button.link.external_url || "" : (block.button.link?.Relation?.value as Page)?.full_path || ""}/></div>
                                    : ""
                                }</h3> : ""
                    }
                    {
                        block.image && typeof block.image !== "number" ?
                            <Image className="size-16" src={block.image.url || ""} alt={block.image.alt || ""}
                                   width={block.image.width || 0} height={block.image.height || 0}/> : ""
                    }
                </div>
        }
    </div>
}

export default BreakerBlock;
