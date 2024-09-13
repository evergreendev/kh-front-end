import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@awesome.me/kit-2a2dc088e2/icons/classic/regular";
import React from "react";

const Search = () => {
    return <div className="flex text-gray-500 items-center text-xl mt-auto ml-2.5">
        <FontAwesomeIcon className="size-5 mr-2" icon={faMagnifyingGlass} size="sm"/>
        <span>Search</span>
    </div>
}

export default Search;
