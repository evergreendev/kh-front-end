import MenuButton from "@/app/components/BlockRenderer/blocks/MenuButton";
import {Page} from "@/app/types/payloadTypes";
import MenuWithSubMenu from "@/app/components/BlockRenderer/blocks/MenuWithSubMenu";

const BlockRenderer = ({blocks}: { blocks: any }) => {
    return <>{
        blocks.map((block: unknown) => {
            let typedBlock = block as {blockType:string};
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
                    return <div className="mb-4"><MenuButton block={menuButtonTypedBlock} key={menuButtonTypedBlock.id} /></div>
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
                    return <MenuWithSubMenu block={menuWithSubmenuTypedBlock} key={menuWithSubmenuTypedBlock.id} />
                case "photoMenu":
                    return <div className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">a</div>
                case "SimpleMenu":
                    return <div className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">Unknown</div>
                case "Breaker":
                    return <div className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">Unknown</div>
                case "collectionCards":
                    return <div className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">Unknown</div>
                case "MediaBlock":
                    return <div className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">Unknown</div>
                case "TextBlock":
                    return <div className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">Unknown</div>
                case "column":
                    return <div className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">Unknown</div>
                default:
                    return <div className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">Unknown Block
                        Type</div>
            }
        })
    }</>
}

export default BlockRenderer;
