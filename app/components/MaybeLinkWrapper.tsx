import {ReactNode} from "react";
import Link from "next/link";

const MaybeLinkWrapper = ({children, href, isExternal, className}: {
    children: ReactNode,
    href?: string | null,
    isExternal?: boolean | null,
    className?: string | null
}) => {
    if (!href) return <div className={className || ""}>
        {children}
    </div>
    if (isExternal) return <a className={className || ""} href={href}>{children}</a>

    return <Link href={href} className={className || ""}>{children}</Link>
}

export default MaybeLinkWrapper;
