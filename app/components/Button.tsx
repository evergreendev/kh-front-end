'use client';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import {buttonConfig, Config} from "@/app/components/ButtonConfig";
import LeavingSiteLink from "@/app/components/LeavingSiteLink";

const Button = ({text, href, icon, config, tabIndex, isExternal, isInline}: {
    text: string,
    href: string,
    icon?: IconProp,
    config?: Config,
    tabIndex?: number,
    isExternal?: boolean | null
    isInline?: boolean | null
}) => {

    if (!config) config = buttonConfig.primary;

    return <>{
                 isExternal
                     ? <LeavingSiteLink tabIndex={tabIndex} href={href}
                                        className={`${isInline ? "inline-flex" : "flex"} w-full md:w-48 xl:w-96 justify-between px-6 py-2 text-xl grow ${config}`}>
                         <span
                             className={`font-opensans`}>{text}</span>
                         {
                             icon &&
                             <FontAwesomeIcon className="size-6 ml-4 my-auto" icon={icon}/>
                         }
                     </LeavingSiteLink>
                     :
                     <Link tabIndex={tabIndex} href={href}
                           className={`${isInline ? "inline-flex" : "flex"} w-full md:w-48 xl:w-96 justify-between px-6 py-2 text-xl grow ${config}`}>
        <span className={`font-opensans`}>{
            text
        }</span>
                         {
                             icon &&
                             <FontAwesomeIcon className="size-6 ml-4 my-auto" icon={icon}/>
                         }
                     </Link>
             }</>
}

export default Button;
