import {Impact, Media, MuseumCollection, Page, Passion, StudentSpotlight} from "@/app/types/payloadTypes";

export function getImage(item: Page | MuseumCollection|StudentSpotlight|Passion|Impact): Media | null {
    if (item.intro_content?.thumbnail) return item.intro_content.thumbnail as Media;
    if (item.intro_content?.images?.[0]) return item.intro_content.images[0].media as Media;
    return null;
}

export function camelCaseToKebabCase(str: string) {
    return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())
}


export function getSlugFromCollection(item: (Page | MuseumCollection|StudentSpotlight|Passion|Impact), collectionSlug: string): string {
    if (collectionSlug === "pages") {
        return `/${(item as Page)?.full_path}`
    } else {
        return `/${camelCaseToKebabCase(collectionSlug)}/${item?.slug}`
    }
}
