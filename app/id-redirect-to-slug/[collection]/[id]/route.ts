import {notFound, redirect} from "next/navigation";
import qs from "qs";

async function getData(tag: string, id: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/pages/${id}?depth=0`,
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
    const res = await getData(params.collection+"_",params.id);

    return redirect("/"+res.full_path);
}
