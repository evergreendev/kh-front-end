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

const Button = ({text, href, icon, config}: { text: string, href: string, icon?: IconProp, config?: string }) => {

    if (!config) config = buttonConfig.primary;

    return <Link href={href} className={`flex text-center  w-96 justify-between px-6 py-3 text-xl ${config}`}>
        <span className="mx-auto">{
            text
        }</span>
        {
            icon &&
            <FontAwesomeIcon className="size-6" icon={icon}/>
        }
    </Link>
}

export default Button;
