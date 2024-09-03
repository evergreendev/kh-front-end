"use client"
import {faBars} from "@awesome.me/kit-2a2dc088e2/icons/classic/solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {RefObject, useEffect, useRef, useState} from "react";
import {Navigation} from "@/app/types/payloadTypes";
import Link from "next/link";

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

const ExpandableButton = ({id, text, href, isExternal, setActiveMenuId}: {
    id: string,
    text: string,
    href: string,
    isExternal: boolean,
    setActiveMenuId: (id: string) => void
}) => {

    return isExternal
        ? <a href={href}>{text}
            <button>Expand</button>
        </a>
        : <Link key={id} href={href}>{text}<button onClick={(e) => {
            e.preventDefault();
            setActiveMenuId(id);
        }}>Expand</button></Link>
}

const MegaMenu = ({nav}: { nav: Navigation }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useOutsideAlerter(menuRef, () => {
        setIsExpanded(false)
        setActiveMenuId(null)
    });

    return <div ref={menuRef}>
        <div
             className={`
             ${isExpanded ? '' : '-translate-x-full'}
             shadow-lg absolute top-0 left-0
             duration-700 
             h-full z-50 bg-white transition-all border-r-8 border-r-brand-yellow`}>
            {
                nav.items.map((item) => {
                    const internalLink = typeof item.Relation?.value !== "number" && item.Relation?.value ? item.Relation.value["full_path"] : null;

                    return <div key={item.id}>
                        <ExpandableButton setActiveMenuId={()=> {
                            setActiveMenuId(item.id || null)
                        }} id={item.id || ""} href={internalLink || item.external_url || "/#"}
                                          isExternal={!!item.external_url} text={item.title || ""}/>
                    </div>
                })
            }
            {
                nav.items.map(item => {
                    return <div key={item.id} className={`border-2 m-5 ${item.id === activeMenuId ? "" : "hidden"}`}>
                        {item.columns?.map((column) => {
                            return <div key={column.id}>{column.id}</div>
                        })}
                    </div>
                })
            }
        </div>
        <button className="p-2 flex items-center text-black transition-colors hover:bg-gray-100"
                onClick={() => {
                    setActiveMenuId(null)
                    setIsExpanded(!isExpanded)
                }}>
            <FontAwesomeIcon size="2x" icon={faBars}/>
            <p className="uppercase ml-2 font-opensans">Menu</p>
        </button>
    </div>
}

export default MegaMenu;
