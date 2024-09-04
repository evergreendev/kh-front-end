import {Page} from "@/app/types/payloadTypes";
import Button, {buttonConfig} from "@/app/components/Button";

const MenuButton = ({block}:{block: {
        item?: {
            relationTo: 'pages';
            value: number | Page;
        } | null;
        text?: string | null;
        buttonStyle?: ('primary' | 'secondary' | 'tertiary' | 'highlight' | 'text') | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'MenuButton';
    }}) => {
    if (typeof block.item?.value === "undefined" || typeof block.item?.value === "number") {
        return <></>;
    }
    return <Button text={block.text || block.item?.value.title} href={`/${block.item?.value.full_path}`} config={buttonConfig[block.buttonStyle||"primary"]}/>
}

export default MenuButton;
