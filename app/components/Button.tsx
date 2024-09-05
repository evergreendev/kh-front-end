import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";

export const buttonConfig = {
    primary: "bg-black text-white hover:bg-gray-600 transition-colors",
    secondary: "",
    tertiary: "",
    highlight: "bg-brand-yellow font-bold",
    text: ""
}

type Config = (typeof buttonConfig)[keyof typeof buttonConfig];

const Button = ({text, href, icon, config, tabIndex}: { text: string, href: string, icon?: IconProp, config?: Config, tabIndex?: number }) => {

    if (!config) config = buttonConfig.primary;

    return <Link tabIndex={tabIndex} href={href} className={`flex w-80 justify-between px-6 py-2 text-xl ${config}`}>
        <span className={`font-opensans ${icon ? "" : "mx-auto"}`}>{
            text
        }</span>
        {
            icon &&
            <FontAwesomeIcon className="size-6" icon={icon}/>
        }
    </Link>
}

export default Button;
