"use client"
import {faBars} from "@awesome.me/kit-2a2dc088e2/icons/classic/solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {RefObject, useEffect, useRef, useState} from "react";

function useOutsideAlerter(ref: RefObject<HTMLDivElement>, action: (...args: any) => void) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                action();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, action]);
}

const MegaMenu = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useOutsideAlerter(menuRef, () => {
        setIsExpanded(false)
    });

    return <div>
        <div ref={menuRef}
             className={`
             ${isExpanded ? '' : '-translate-x-full'}
             shadow-lg absolute top-0 left-0 w-full
             duration-700 
             max-w-screen-2xl h-full z-50 bg-white transition-all border-r-8 border-r-brand-yellow`}>
            OPEN
        </div>
        <button className="p-2 flex items-center text-black transition-colors hover:bg-gray-100" onClick={() => setIsExpanded(!isExpanded)}>
            <FontAwesomeIcon size="2x" icon={faBars}/>
            <p className="uppercase ml-2 font-opensans">Menu</p>
        </button>
    </div>
}

export default MegaMenu;
