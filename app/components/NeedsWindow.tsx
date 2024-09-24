"use client"
import useHasWindow from "@/app/hooks/useHasWindow";
import {ReactNode} from "react";

const NeedsWindow = ({children}:{children:ReactNode}) => {
    const hasWindow = useHasWindow();

    return hasWindow && <>{children}</>
}

export default NeedsWindow;
