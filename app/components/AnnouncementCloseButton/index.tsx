"use client"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@awesome.me/kit-2a2dc088e2/icons/classic/regular";
import React from "react";
import {setCookie} from "@/app/components/AnnouncementCloseButton/setCookie";

const AnnouncementCloseButton = ({updatedAt}:{updatedAt:string}) => {

    return <form className="absolute right-2 top-2" action={() => setCookie(updatedAt)}><button type="submit" >
        <FontAwesomeIcon  className="size-5 ml-2" icon={faXmark}/>
    </button></form>
}

export default AnnouncementCloseButton;
