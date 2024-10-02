import MenuButton from "@/app/components/BlockRenderer/blocks/MenuButton";
import MenuWithSubMenu from "@/app/components/BlockRenderer/blocks/MenuWithSubMenu";
import PhotoMenuBlock from "@/app/components/BlockRenderer/blocks/PhotoMenuBlock";
import {ForwardedRef, forwardRef} from "react";
import Columns from "@/app/components/BlockRenderer/blocks/Columns";
import MediaBlock from "@/app/components/BlockRenderer/blocks/MediaBlock";
import TextBlock from "@/app/components/BlockRenderer/blocks/TextBlock";
import BreakerBlock from "@/app/components/BlockRenderer/blocks/BreakerBlock";
import HeaderBlock from "@/app/components/BlockRenderer/blocks/HeaderBlock";
import CompareSliderBlock from "@/app/components/BlockRenderer/blocks/CompareSliderBlock";
import FormBlock from "@/app/components/BlockRenderer/blocks/FormBlock";
import EmploymentBlock from "@/app/components/BlockRenderer/blocks/EmploymentBlock";
import CollectionCardsBlock from "@/app/components/BlockRenderer/blocks/CollectionCardsBlock";
import SingleCollectionBlock from "@/app/components/BlockRenderer/blocks/SingleCollectionBlock";
import SpacerBlock from "@/app/components/BlockRenderer/blocks/SpacerBlock";
import {GalleryBlock} from "@/app/components/BlockRenderer/blocks/GalleryBlock";

const BlockRenderer = forwardRef(function BlockRenderer({blocks, tabIndex}: {
    blocks: any,
    tabIndex?: number
}, ref: ForwardedRef<any>) {
    return <>{
        blocks.map((block: unknown, index: number) => {
            let typedBlock = block as { blockType: string };
            switch (typedBlock.blockType) {
                case "MenuButton":
                    return <div key={(block as any).id} className="mb-4"><MenuButton tabIndex={tabIndex}
                                                                                     block={block as any}
                    /></div>
                case "MenuWithSubMenu":
                    return <MenuWithSubMenu tabIndex={tabIndex} block={block as any}
                                            key={(block as any).id}/>
                case "photoMenu":
                    return <PhotoMenuBlock tabIndex={tabIndex} block={block as any}
                                           key={(block as any).id}/>
                case "SimpleMenu":
                    return <div key={(block as any).id} className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">Unknown</div>
                case "Breaker":
                    return <BreakerBlock block={block as any} key={(block as any).id}/>
                case "collectionCards":
                    return <CollectionCardsBlock key={(block as any).id} block={block as any}/>
                case "MediaBlock":
                    return <MediaBlock block={block as any} key={(block as any).id}/>
                case "TextBlock":
                    return <TextBlock block={block as any} key={(block as any).id}/>
                case "column":
                    return <Columns block={block as any} key={(block as any).id}/>
                case "HeaderBlock":
                    return <HeaderBlock key={(block as any).id} block={block as any}/>
                case "CompareSliderBlock":
                    return <CompareSliderBlock block={block as any} key={(block as any).id}/>
                case "FormBlock":
                    return <FormBlock key={(block as any).id} block={block as any}/>
                case "EmploymentBlock":
                    return <EmploymentBlock key={(block as any).id} block={block as any}/>
                case "singleCollectionBlock":
                    return <SingleCollectionBlock block={block as any} key={(block as any).id}/>
                case "SpacerBlock":
                    return <SpacerBlock block={block as any} key={(block as any).id}/>
                case "gallery":
                    return <GalleryBlock block={block as any} key={(block as any).id}/>
                default:
                    return <div key={(block as any).id} className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">Unknown Block
                        Type</div>
            }
        })
    }</>
})

export default BlockRenderer;
