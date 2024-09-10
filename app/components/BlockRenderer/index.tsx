import MenuButton from "@/app/components/BlockRenderer/blocks/MenuButton";
import {Media, Page} from "@/app/types/payloadTypes";
import MenuWithSubMenu from "@/app/components/BlockRenderer/blocks/MenuWithSubMenu";
import PhotoMenuBlock from "@/app/components/BlockRenderer/blocks/PhotoMenuBlock";
import {ForwardedRef, forwardRef} from "react";
import Columns from "@/app/components/BlockRenderer/blocks/Columns";
import MediaBlock from "@/app/components/BlockRenderer/blocks/MediaBlock";
import TextBlock from "@/app/components/BlockRenderer/blocks/TextBlock";

const BlockRenderer = forwardRef(function BlockRenderer({blocks, tabIndex}: {
    blocks: any,
    tabIndex?: number
}, ref: ForwardedRef<any>) {
    return <>{
        blocks.map((block: unknown, index: number) => {
            let typedBlock = block as { blockType: string };
            switch (typedBlock.blockType) {
                case "MenuButton":
                    const menuButtonTypedBlock = block as {
                        item?: {
                            relationTo: 'pages';
                            value: number | Page;
                        } | null;
                        text?: string | null;
                        buttonStyle?: ('primary' | 'secondary' | 'tertiary' | 'highlight' | 'text') | null;
                        id?: string | null;
                        blockName?: string | null;
                        blockType: 'MenuButton';
                    };
                    return <div className="mb-4"><MenuButton tabIndex={tabIndex} block={menuButtonTypedBlock}
                                                             key={menuButtonTypedBlock.id}/></div>
                case "MenuWithSubMenu":
                    const menuWithSubmenuTypedBlock = block as {
                        headerItem?: {
                            title?: string | null;
                            external?: boolean | null;
                            Relation?: {
                                relationTo: 'pages';
                                value: number | Page;
                            } | null;
                            external_url?: string | null;
                        };
                        items?:
                            | {
                            title?: string | null;
                            external?: boolean | null;
                            Relation?: {
                                relationTo: 'pages';
                                value: number | Page;
                            } | null;
                            external_url?: string | null;
                            id?: string | null;
                        }[]
                            | null;
                        id?: string | null;
                        blockName?: string | null;
                        blockType: 'MenuWithSubMenu';
                    }
                    return <MenuWithSubMenu tabIndex={tabIndex} block={menuWithSubmenuTypedBlock}
                                            key={menuWithSubmenuTypedBlock.id}/>
                case "photoMenu":
                    const photoMenuTypedBlock = block as {
                        title?: string | null;
                        external?: boolean | null;
                        Relation?: {
                            relationTo: 'pages';
                            value: number | Page;
                        } | null;
                        external_url?: string | null;
                        item?:
                            | {
                            image?: number | Media | null;
                            title?: string | null;
                            external?: boolean | null;
                            Relation?: {
                                relationTo: 'pages';
                                value: number | Page;
                            } | null;
                            external_url?: string | null;
                            id?: string | null;
                        }[]
                            | null;
                        id?: string | null;
                        blockName?: string | null;
                        blockType: 'photoMenu';
                    }
                    return <PhotoMenuBlock tabIndex={tabIndex} block={photoMenuTypedBlock}
                                           key={photoMenuTypedBlock.id}/>
                case "SimpleMenu":
                    return <div className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">Unknown</div>
                case "Breaker":
                    return <div className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">Unknown</div>
                case "collectionCards":
                    return <div className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">Unknown</div>
                case "MediaBlock":
                    const typedMediaBlock = block as {
                        media?: number | Media | null;
                        thumbnail?: number | Media | null;
                        id?: string | null;
                        blockName?: string | null;
                        blockType: 'MediaBlock';
                    }

                    return <MediaBlock block={typedMediaBlock}/>
                case "TextBlock":
                    const textBlockTypedBlock = block as {
                        heading_1?: string | null;
                        heading_2?: string | null;
                        heading_link?: {
                            title?: string | null;
                            external?: boolean | null;
                            Relation?: {
                                relationTo: 'pages';
                                value: number | Page;
                            } | null;
                            external_url?: string | null;
                            label?: string | null;
                        };
                        body?: {
                            text?: {
                                root: {
                                    type: string;
                                    children: {
                                        type: string;
                                        version: number;
                                        [k: string]: unknown;
                                    }[];
                                    direction: ('ltr' | 'rtl') | null;
                                    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                                    indent: number;
                                    version: number;
                                };
                                [k: string]: unknown;
                            } | null;
                            text_html?: string | null;
                            link_list?:
                                | {
                                title?: string | null;
                                external?: boolean | null;
                                Relation?: {
                                    relationTo: 'pages';
                                    value: number | Page;
                                } | null;
                                external_url?: string | null;
                                label?: string | null;
                                id?: string | null;
                            }[]
                                | null;
                        };
                        id?: string | null;
                        blockName?: string | null;
                        blockType: 'TextBlock';
                    }
                    return <TextBlock block={textBlockTypedBlock}/>
                case "column":
                    const columnTypedBlock = block as {
                        vertical_separator?: boolean | null;
                        columns?:
                            | {
                            content?:
                                | (
                                | {
                                media?: number | Media | null;
                                thumbnail?: number | Media | null;
                                id?: string | null;
                                blockName?: string | null;
                                blockType: 'MediaBlock';
                            }
                                | {
                                heading_1?: string | null;
                                heading_2?: string | null;
                                heading_link?: {
                                    link?: string | null;
                                    label?: string | null;
                                };
                                body?: {
                                    text?: {
                                        root: {
                                            type: string;
                                            children: {
                                                type: string;
                                                version: number;
                                                [k: string]: unknown;
                                            }[];
                                            direction: ('ltr' | 'rtl') | null;
                                            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                                            indent: number;
                                            version: number;
                                        };
                                        [k: string]: unknown;
                                    } | null;
                                    link_list?:
                                        | {
                                        link?: string | null;
                                        label?: string | null;
                                        id?: string | null;
                                    }[]
                                        | null;
                                };
                                id?: string | null;
                                blockName?: string | null;
                                blockType: 'TextBlock';
                            }
                                )[]
                                | null;
                            width?: ('1/3' | '2/3' | '1/2' | '1/4' | '3/4') | null;
                            id?: string | null;
                        }[]
                            | null;
                        id?: string | null;
                        blockName?: string | null;
                        blockType: 'column';
                    }
            return <Columns block={columnTypedBlock}/>
        default:
            return <div className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">Unknown Block
                Type</div>
        }
    })
        }</>
})

export default BlockRenderer;
