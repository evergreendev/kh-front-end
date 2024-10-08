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
    return <div className={
        `
        ${block.underlineHighlight ? "font-bold underline underline-offset-8 decoration-brand-yellow decoration-4" : "p-6"}
        `}>
        {renderText(block.text?.root, 1, block.id||"0",  block.largeText ? "text-3xl sm:text-5xl font-ptserif" : "text-xl font-opensans max-w-[58ch]")}
    </div>
}

export default HeaderBlock;
