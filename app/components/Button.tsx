import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";

export const buttonConfig = {
    primary: "bg-black text-white hover:bg-gray-600 transition-colors",
    secondary: "bg-blue-600 hover:bg-blue-700 text-white",
    tertiary: "bg-white text-black hover:bg-gray-100 transition-colors font-bold",
    highlight: "bg-brand-yellow font-bold",
    text: "bg-transparent hover:bg-gray-100"
}

type Config = (typeof buttonConfig)[keyof typeof buttonConfig];

const Button = ({text, href, icon, config, tabIndex, isExternal}: {
    text: string,
    href: string,
    icon?: IconProp,
    config?: Config,
    tabIndex?: number,
    isExternal?: boolean | null
}) => {

    if (!config) config = buttonConfig.primary;

    return <>{
        isExternal
            ? <a tabIndex={tabIndex} href={href}
                 className={`inline-flex w-80 justify-between px-6 py-2 text-xl ${config}`}><span
                className={`font-opensans ${icon ? "" : "mx-auto"}`}>{
                text
            }</span>
                {
                    icon &&
                    <FontAwesomeIcon className="size-6" icon={icon}/>
                }
            </a>
            : <Link tabIndex={tabIndex} href={href}
                    className={`inline-flex w-80 justify-between px-6 py-2 text-xl ${config}`}>
        <span className={`font-opensans ${icon ? "" : "mx-auto"}`}>{
            text
        }</span>
                {
                    icon &&
                    <FontAwesomeIcon className="size-6" icon={icon}/>
                }
            </Link>
    }</>
}

export default Button;
