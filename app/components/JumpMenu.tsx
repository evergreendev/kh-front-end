"use client"
import {Page} from "@/app/types/payloadTypes";
import Link from "next/link";
import {Fragment} from "react";

type link = {
    relationTo: string,
    value: Page|number
}|null

const JumpMenu = ({items}:{items:{id?: string|null, title?: string|null, internal_link?:string|null, link?:link}[]}) => {

    return <div className="flex gap-8 bg-grey pl-6 pb-3 pt-4 pr-24">
        <p className="font-bold mr-4">Jump to</p>
        {items.map(item => {

            if (typeof item.link?.value === "number") return <Fragment key={item.id}></Fragment>
            return <Link className="border-b-2 font-bold border-black" key={item.id} href={`${(item.link?.value?.full_path ? "/"+item.link.value.full_path : "") + "#"+item.internal_link}`}>{item.title}</Link>
        })}
    </div>
}

export default JumpMenu
