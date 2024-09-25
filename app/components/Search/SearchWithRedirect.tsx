"use client"

import {useRouter} from "next/navigation";
import {useRef} from "react";



const SearchWithRedirect = ({}) => {
    const router = useRouter();
    const searchRef = useRef<HTMLInputElement>(null);

    return <form className="mb-6" onSubmit={(e) => {
        e.preventDefault();
        if (searchRef.current) {
            router.push(`/search?search=${searchRef.current.value}`);
        }
    }}>
        <div
            className={`p-4 flex flex-col flex-wrap`}
            style={{width: `100%`}}>
            <label className="mr-2 font-opensans font-normal text-sm"
                   htmlFor="search">Search</label>
            <div className="max-w-full mt-auto">
                <input ref={searchRef} className="border border-stone-300 p-1.5 bg-white rounded w-full" type="text" name="search"
                       id="search"/>
            </div>
        </div>
        <input className="bg-blue-900 p-8 py-2 text-white ml-auto flex" type="submit" value="Submit"/>
    </form>
}

export default SearchWithRedirect;
