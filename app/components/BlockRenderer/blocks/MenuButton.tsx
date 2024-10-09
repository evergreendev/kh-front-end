import {Page} from "@/app/types/payloadTypes";
import Button from "@/app/components/Button";
import {Fragment} from "react";
import {faChevronCircleRight} from "@awesome.me/kit-2a2dc088e2/icons/classic/thin";
import {getSlugFromCollection} from "@/app/components/BlockRenderer/blocks/blockHelpers";
import {buttonConfig} from "@/app/components/ButtonConfig";

const MenuButton = ({block, tabIndex}: {
    block: {
        title?: string | null;
        external?: boolean | null;
        Relation?: {
            relationTo: 'pages';
            value: number | Page;
        } | null;
        external_url?: string | null;
        buttonStyle?: ('primary' | 'secondary' | 'tertiary' | 'highlight' | 'text') | null;
        fragment?: string | null;
        hasIcon?: boolean | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'MenuButton';
    }, tabIndex?: number
}) => {
    if (block.external) return <div><Button icon={block.hasIcon ? faChevronCircleRight : undefined}
                                            isExternal={block.external} tabIndex={tabIndex} text={block.title || ""}
                                            href={`${block.external_url}`}
                                            config={buttonConfig[block.buttonStyle || "primary"]}/></div>

    if (typeof block.Relation?.value === "undefined" || typeof block.Relation?.value === "number") {
        return <Fragment key={block.id}></Fragment>;
    }
    return <div><Button icon={block.hasIcon ? faChevronCircleRight : undefined} isExternal={block.external}
                        tabIndex={tabIndex} text={block.title || block.Relation?.value.title}
                        href={getSlugFromCollection(block.Relation.value, block.Relation.relationTo) + (block.fragment ? `/#${block.fragment}` : "")}
                        config={buttonConfig[block.buttonStyle || "primary"]}/></div>


}

export default MenuButton;
