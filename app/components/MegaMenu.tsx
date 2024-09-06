"use client"
import {faBars} from "@awesome.me/kit-2a2dc088e2/icons/classic/solid";
import {faPlusCircle,faMinusCircle} from "@awesome.me/kit-2a2dc088e2/icons/classic/light";
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

const ExpandableButton = forwardRef(function ExpandableButton({id, text, item, setActiveMenuId, tabIndex, isExpanded, firstFocusable}: {
    id: string,
    text: string,
    item: any,
    setActiveMenuId: (id: string|null) => void,
    tabIndex: number,
    isExpanded: boolean,
    firstFocusable: RefObject<any>
}, ref: ForwardedRef<any>) {
    const linkInfo = getUrlFromPageOrExternal(item);

    const ExpandButton = () => {
        return <button
            aria-label={`Expand ${text} menu`}
            className={`p-3 hover:bg-gray-800 hover:text-white focus:bg-gray-700 text-2xl`}
            tabIndex={tabIndex} onClick={(e) => {
            e.preventDefault();
            setActiveMenuId(isExpanded ? null : id);
        }}>
            {
                isExpanded
                    ? <FontAwesomeIcon size="lg" icon={faMinusCircle}/>
                    : <FontAwesomeIcon size="lg" icon={faPlusCircle}/>
            }
        </button>
    }

    return linkInfo.isExternal
        ? <a className={`bg-black text-3xl flex mr-6 group ${isExpanded ? "bg-gray-100 text-black": "text-white"}`} ref={ref} tabIndex={tabIndex} href={linkInfo.url}>
            <span className="p-4 hover:bg-gray-900 hover:text-white group-focus:bg-gray-700">{text}</span>
            <ExpandButton/>
        </a>
        : <Link className={`bg-black text-3xl flex mr-6 group ${isExpanded ? "bg-gray-100 text-black": "text-white"}`} ref={ref} tabIndex={tabIndex} key={id} href={linkInfo.url}>
            <span className="p-4 hover:bg-gray-900 hover:text-white group-focus:bg-gray-700">{text}</span>
            <ExpandButton/>
        </Link>
})

const MegaMenu = ({nav}: { nav: Navigation }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(nav.items[0].id||null);
    const firstFocusableElements = useRef<any>(
        Object.fromEntries(nav.items.map(item => {
            return [item.id, createRef()];
        }))
    );

    const menuRef = useRef<HTMLDivElement>(null);
    const firstFocusableElementRef = useRef<HTMLElement>(null);

    useOutsideAlerter(menuRef, () => {
        setIsExpanded(false)
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
             ${isExpanded ? '' : '-translate-y-full'}
             shadow-lg top-0 left-0
             flex
             flex-wrap
             w-full
             h-[80vh]
             items-start
             overflow-hidden
             fixed
             p-6
             font-opensans
             duration-700 
             z-50 bg-white bg-opacity-95 transition-all border-b-8 border-b-brand-yellow`}>
            {
                nav.items.map((item, index) => {
                    return <div className="mt-6" key={item.id}>
                        <ExpandableButton isExpanded={activeMenuId === item.id} firstFocusable={firstFocusableElements.current[item.id || ""]}
                                          ref={index === 0 ? firstFocusableElementRef : null}
                                          tabIndex={isExpanded ? 0 : -1} item={item} setActiveMenuId={() => {
                            setActiveMenuId(item.id || null)
                        }} id={item.id || ""} text={item.title || ""}/>
                    </div>
                })
            }
            <div className="relative w-full h-full overflow-hidden p-6">
                {
                    nav.items.map(item => {
                        return <div key={item.id}
                                    className={`absolute bg-gray-200 transition-all duration-700 flex-wrap w-full overflow-hidden top-0 left-0 ${item.id === activeMenuId ? "max-h-screen z-10" : "max-h-0"}`}>
                            <div className="p-6 flex flex-wrap">
                                <h2 className="w-full font-ptserif text-5xl text-gray-950 mb-6">{item.title}</h2>
                                {item.columns?.map((column,index) => {
                                    return <div key={column.id}
                                                className={`flex flex-col ${widths[column.width || "1/4"]}`}>
                                        <BlockRenderer ref={index === 0 ? firstFocusableElements.current[item.id||""]:null} tabIndex={item.id === activeMenuId && isExpanded ? 0 : -1} key={column.id}
                                                       blocks={column.content}/>
                                    </div>
                                })}
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
        <button className="p-2 flex items-center text-black transition-colors hover:bg-gray-100"
                onClick={() => {
                    setIsExpanded(!isExpanded)
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        firstFocusableElementRef.current?.focus();
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
