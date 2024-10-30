// 2ⁿᵈ step logic
const camelize = (string: string) =>  string.replace(/-([a-z])/gi,(s, group) =>  group.toUpperCase());

// 1ˢᵗ step logic which calls the 2ⁿᵈ step logic
const style2object = (style: string) => style.split(';').filter(s => s.length)
    .reduce((a: { [x: string]: any; }, b: string) => {
        const keyValue = b.split(':');
        a[camelize(keyValue[0])] = keyValue[1] ;
        return a;
    } ,{});

const IFrameBlock = ({block}:{block:{
        containerStyle?: string | null;
        fields?:
            | {
            property: string;
            value?: string | null;
            id?: string | null;
        }[]
            | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'IFrame';
    }}) => {

    const propertyObj = {}
    block.fields?.forEach((field) => {
        if (field.property === "style"){
            // @ts-ignore
            propertyObj[field.property] = style2object(field.value||"");
        } else{
            // @ts-ignore
            propertyObj[field.property] = field.value;
        }


    })

    // @ts-ignore
    return <div style={block.containerStyle ? style2object(block.containerStyle):{}}><iframe {...propertyObj}/></div>
}

export default IFrameBlock;
