import Link from "next/link";
import React from "react";

const BreadCrumbs = ({fullPath}: { fullPath: string }) => {
    const pathParts = fullPath.split('/');
    let prevPath = "/";

    return <div className="flex gap-1 items-center text-gray-400">
        {
            pathParts[0] !== "home" && <React.Fragment key={"home"}><Link className="hover:text-gray-600" href="/">Home</Link> &gt;</React.Fragment>
        }
        {pathParts.map((part, i) => {
            if (i !== 0) {
                prevPath += `${pathParts[i - 1]}/`;
            }
            return <React.Fragment key={part}>
                <Link className="hover:text-gray-600" href={`${prevPath}${part}`}>{part.toLowerCase()
                    .split('-')
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')}</Link>
                {
                    (i !== pathParts.length - 1 && pathParts.length > 1) && ">"
                }
            </React.Fragment>
        })}
    </div>
}

export default BreadCrumbs;
