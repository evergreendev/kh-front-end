import MenuButton from "@/app/components/BlockRenderer/blocks/MenuButton";
import {Page} from "@/app/types/payloadTypes";

const BlockRenderer = ({blocks}: { blocks: any }) => {
    return <>{
        blocks.map((block: unknown) => {
            const {blockType} = block as {blockType:string};
            switch (blockType) {
                case "MenuButton":
                    const typedBlock = block as {
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
                    return <div className="mb-4"><MenuButton block={typedBlock} key={typedBlock.id} /></div>
                case "MenuWithSubMenu":
                    return <div className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">Unknown</div>
                case "photoMenu":
                    return <div className="bg-red-100 text-red-800 text-center w-96 mx-auto p-8">Unknown</div>
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
