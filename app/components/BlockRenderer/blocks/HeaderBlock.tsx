import renderText from "@/app/components/BlockRenderer/utils/renderText";

const HeaderBlock = ({block}:{block:{
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
        underlineHighlight?: boolean | null;
        largeText?: boolean | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'HeaderBlock';
    }}) => {
    console.log(block.largeText);

    return <div className={
        `
        ${block.underlineHighlight ? "font-bold underline decoration-2 decoration-brand-yellow" : ""}
        `}>
        {renderText(block.text?.root, 1, block.largeText ? "text-5xl" : "text-xl")}
    </div>
}

export default HeaderBlock;
