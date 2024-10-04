const SpacerBlock = ({block}: {
    block: {
        height?: number | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'SpacerBlock';
    }
}) => {
    return <div style={{height: block.height||0,marginTop: block.height && block.height < 0 ? block.height : 0}}></div>
}

export default SpacerBlock;
