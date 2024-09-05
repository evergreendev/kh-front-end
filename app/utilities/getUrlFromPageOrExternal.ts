import {Page} from "@/app/types/payloadTypes";

function getUrlFromPageOrExternal(item: {
    Relation?: {
        relationTo: 'pages';
        value: number | Page;
    } | null;
    external_url?: string | null;
}|null|undefined) {
    if (!item) return {
        url: "#",
        isExternal: false
    };

    const internalLink = typeof item.Relation?.value !== "number" && item.Relation?.value ? item.Relation.value["full_path"] : null;

    if(internalLink){
        return {
            url: "/"+internalLink,
            isExternal: false
        }
    }
    if (item.external_url){
        return {
            url: item.external_url,
            isExternal: true
        }
    }

    return {
        url: "#",
        isExternal: false
    };
}

export default getUrlFromPageOrExternal;
