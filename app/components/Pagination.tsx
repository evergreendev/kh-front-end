"use client"
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {faChevronRight,faChevronLeft} from "@awesome.me/kit-2a2dc088e2/icons/classic/thin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Pagination = ({totalPages}: { totalPages: number }) => {
    const searchParams = useSearchParams();
    const currPage = searchParams.get("page") || "1";
    const pageArr: any[] = [];
    const pathname = usePathname();
    const {replace} = useRouter();

    for (let i = 0; i < totalPages; i++) {
        pageArr.push((i + 1).toString());
    }

    function handleClick(page: number) {
        const params = new URLSearchParams(searchParams);

        params.set('page', page.toString());

        replace(`${pathname}?${params.toString()}`)
    }

    if (pageArr.length <= 1) return <></>;

    const buttonArr = pageArr.map((page: any) => {
        return <button key={page} onClick={() => handleClick(page)}
                       className={`bg-slate-500 text-white p-2
                       ${currPage === page ? "bg-slate-800" : ""}
                       `}>{page}</button>
    })

    return <div>
        <button className="pr-2 w-14" onClick={() => handleClick(1)}>{
            currPage === "1" ? <span className="font-bold">First</span> : "First"
        }</button>
        {
            <button className="px-1 size-6" disabled={currPage === "1"}
                    onClick={() => handleClick(Math.max((parseInt(currPage) - 1), 1))}>
                {currPage === "1" ? "" : <FontAwesomeIcon icon={faChevronLeft}/>}
            </button>
        }
        {buttonArr}
        {
            <button className="px-1 size-6"
                    disabled={parseInt(currPage) === totalPages}
                    onClick={() => handleClick(Math.min((parseInt(currPage) + 1), totalPages))}>
                {parseInt(currPage) === totalPages ? "" : <FontAwesomeIcon icon={faChevronRight}/>}
            </button>
        }
        <button className="pl-2 w-14" onClick={() => handleClick(totalPages)}>{
            parseInt(currPage) === totalPages ? <span className="font-bold">Last</span> : "Last"
        }</button>
    </div>;
}

export default Pagination;