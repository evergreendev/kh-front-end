"use client"
import {faBars} from "@awesome.me/kit-2a2dc088e2/icons/classic/solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {createRef, ForwardedRef, forwardRef, RefObject, useEffect, useRef, useState} from "react";
import {Navigation} from "@/app/types/payloadTypes";
import Link from "next/link";
import BlockRenderer from "@/app/components/BlockRenderer";
import getUrlFromPageOrExternal from "@/app/utilities/getUrlFromPageOrExternal";

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

const ExpandableButton = forwardRef(function ExpandableButton({id, text, item, setActiveMenuId, tabIndex, firstFocusable}: {
    id: string,
    text: string,
    item: any,
    setActiveMenuId: (id: string) => void,
    tabIndex: number,
    firstFocusable: RefObject<any>
}, ref: ForwardedRef<any>) {
    const linkInfo = getUrlFromPageOrExternal(item);
    return linkInfo.isExternal
        ? <a ref={ref} tabIndex={tabIndex} href={linkInfo.url}>{text}
            <button tabIndex={tabIndex}
                    onClick={(e) => {
                        e.preventDefault();
                        setActiveMenuId(id);
                    }}
            >Expand
            </button>
        </a>
        : <Link ref={ref} tabIndex={tabIndex} key={id} href={linkInfo.url}>{text}
            <button tabIndex={tabIndex} onClick={(e) => {
                e.preventDefault();
                setActiveMenuId(id);
            }}>Expand
            </button>
        </Link>
})

const MegaMenu = ({nav}: { nav: Navigation }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    const firstFocusableElements = useRef<any>(
        Object.fromEntries(nav.items.map(item => {
            return [item.id, createRef()];
        }))
    );

    const menuRef = useRef<HTMLDivElement>(null);
    const firstFocusableElementRef = useRef<HTMLElement>(null);

    useOutsideAlerter(menuRef, () => {
        setIsExpanded(false)
        setActiveMenuId(null)
    });

    const widths = {
        "1/3": "md:w-4/12",
        "2/3": "md:w-8/12",
        "1/4": "md:w-3/12",
        "1/2": "md:w-6/12",
        "3/4": "md:w-9/12",
    }

    return <div ref={menuRef}>
        <div
            aria-hidden={!isExpanded}
            className={`
             ${isExpanded ? '' : '-translate-x-full'}
             shadow-lg absolute top-0 left-0
             flex
             flex-wrap
             w-full
             max-w-screen-2xl
             items-start
             font-opensans
             duration-700 
             h-full z-50 bg-white transition-all border-r-8 border-r-brand-yellow`}>
            {
                nav.items.map((item, index) => {
                    return <div key={item.id}>
                        <ExpandableButton firstFocusable={firstFocusableElements.current[item.id || ""]}
                                          ref={index === 0 ? firstFocusableElementRef : null}
                                          tabIndex={isExpanded ? 0 : -1} item={item} setActiveMenuId={() => {
                            setActiveMenuId(item.id || null)
                        }} id={item.id || ""} text={item.title || ""}/>
                    </div>
                })
            }
            <div className="relative w-full h-full mt-6 overflow-hidden p-6">
                {
                    nav.items.map(item => {
                        return <div key={item.id}
                                    className={`absolute bg-gray-100 shadow transition-all duration-700 p-6 flex w-full top-0 left-0 ${item.id === activeMenuId ? "" : "-translate-x-full"}`}>
                            {item.columns?.map((column,index) => {
                                return <div key={column.id}
                                            className={`flex flex-col ${widths[column.width || "1/4"]}`}>
                                    <BlockRenderer ref={index === 0 ? firstFocusableElements.current[item.id||""]:null} tabIndex={item.id === activeMenuId ? 0 : -1} key={column.id}
                                                   blocks={column.content}/>
                                </div>
                            })}
                        </div>
                    })
                }
            </div>
        </div>
        <button className="p-2 flex items-center text-black transition-colors hover:bg-gray-100"
                onClick={() => {
                    setActiveMenuId(null)
                    setIsExpanded(!isExpanded)
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        firstFocusableElementRef.current?.focus();
                        setActiveMenuId(null)
                        setIsExpanded(!isExpanded)
                    }
                }}
        >
            <FontAwesomeIcon size="2x" icon={faBars}/>
            <p className="uppercase ml-2 font-opensans">Menu</p>
        </button>
    </div>
}

export default MegaMenu;
