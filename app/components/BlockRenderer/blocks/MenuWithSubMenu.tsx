import {Page} from "@/app/types/payloadTypes";
import Link from "next/link";
import getUrlFromPageOrExternal from "@/app/utilities/getUrlFromPageOrExternal";

const MenuWithSubMenu = ({block}: {
    block: {
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
}) => {
    const linkInfo = getUrlFromPageOrExternal(block.headerItem);

    return <div className="flex flex-col text-2xl">
        {
            linkInfo.isExternal
                ? <a className="p-2 hover:bg-white block" href={linkInfo.url}>{block.headerItem?.title}</a>
                : <Link className="p-2 hover:bg-white block" href={linkInfo.url}>{block.headerItem?.title}</Link>
        }
        <div className="flex flex-col ml-6">
            {block.items?.map(item => {
                const childLinkInfo = getUrlFromPageOrExternal(item);
                if (childLinkInfo.isExternal) {
                    return <a className="p-2 border-l-2 border-l-gray-200 hover:bg-white block" key={item.id} href={childLinkInfo.url}>{item.title}</a>
                }
                return <Link className="p-2 border-l-2 border-l-gray-200 hover:bg-white block" key={item.id} href={childLinkInfo.url}>{item.title}</Link>
            })}
        </div>

    </div>
}

export default MenuWithSubMenu;
