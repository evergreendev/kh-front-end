import {Page} from "@/app/types/payloadTypes";
import Link from "next/link";

type link = {
    relationTo: string,
    value: Page
}|null

const JumpMenu = ({items}:{items:{id: string, title: string, internal_link?:string|null, link?:link}[]}) => {

    return <div className="flex gap-8 bg-grey pl-6 pb-3 pt-4 pr-24">
        <p className="font-bold mr-4">Jump to</p>
        {items.map(item => {
            return <Link className="border-b-2 font-bold border-black" key={item.id} href={`/${item.link?.value.full_path || "#"+item.internal_link}`}>{item.title}</Link>
        })}
    </div>
}

export default JumpMenu
