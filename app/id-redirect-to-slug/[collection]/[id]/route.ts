import {notFound, redirect} from "next/navigation";
import {camelCaseToKebabCase} from "@/app/components/BlockRenderer/blocks/blockHelpers";

async function getData(tag: string, id: string,collection:string) {
    console.log(collection);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/${collection}/${id}?depth=0`,
        {
            next: {
                tags: [tag]
            }
        }
    );

    if (res.status !== 200) notFound();

    return res.json();
}

export async function GET(request: Request,
                          { params }: { params: { id: string, collection: string } }) {
    const res = await getData(params.collection+"_",params.id,params.collection);

    if (params.collection === "pages") return redirect("/"+res.full_path);

    return redirect("/"+camelCaseToKebabCase(params.collection)+"/"+res.slug);
}
