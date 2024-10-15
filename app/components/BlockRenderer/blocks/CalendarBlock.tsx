"use client"

import {ReactNode, useCallback, useEffect, useState} from "react";
import {Calendar} from "@/app/types/payloadTypes";
import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

async function getCalendarData(): Promise<Calendar> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/globals/calendar?locale=undefined&draft=false&depth=1`,
        {
            next: {
                tags: ["siteOptions_"]
            }
        });
    return await res.json();
}

const firstDayOfWeek = (date = new Date()) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

const lastDayOfWeek = (date = new Date()) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

function getDaysInMonth(month: number, year: number): number {
    if (month > 11) {
        month = 0;
        year = year + 1;
    }
    if (month < 0) {
        month = 11;
        year = year - 1;
    }
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    return month === 1 && year % 4 === 0 ? 29 : daysInMonth[month];
}

// @ts-ignore
function hasEventToday(calendarItem: Calendar["calendarItems"][0], currDate: Date): boolean {

    if (!calendarItem || !calendarItem.dates) return false;

    return calendarItem.dates.find((date: any) => {
        const dateToCheck = new Date(date.date);
        const year = currDate.getFullYear();
        const month = currDate.getMonth();
        const day = currDate.getDate();

        return year === dateToCheck.getFullYear() && month === dateToCheck.getMonth() && day === dateToCheck.getDate();
    });
}

export const CalendarBlock = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const dateObj = new Date();
    
    const [currDateObj, setCurrentDateObj] = useState(dateObj);
    const [currMonth, setCurrMonth] = useState<number>(dateObj.getMonth());
    const [currYear, setCurrYear] = useState<number>(dateObj.getFullYear());
    const [dateElements, setDateElements] = useState<ReactNode[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [calendarItems, setCalendarItems] = useState<Calendar["calendarItems"] | null>(null);


    useEffect(() => {
        async function getData() {
            const data = await getCalendarData();

            setCalendarItems(data.calendarItems)
        }

        getData();

        if (searchParams.has("month") && searchParams.has("year") && searchParams.has("date")) {
            const month = parseInt(searchParams.get("month") || "");
            const year = parseInt(searchParams.get("year") || "");
            const date = parseInt(searchParams.get("date") || "");

            setCurrMonth(month);

            setCurrYear(year);
            setSelectedDate(new Date(year, month, date));
        }
    }, []);

    const isCurrSelected = useCallback((date: number, month: number, year: number) => {
        if (selectedDate === null) return false;

        if (month > 11) {
            month = 0;
            year = year + 1;
        }
        if (month < 0) {
            month = 11;
            year = year - 1;
        }

        return selectedDate.getDate() === date && selectedDate.getMonth() === month && selectedDate.getFullYear() === year
    }, [selectedDate]);

    function handleDateClick(date: number, month: number, year: number) {
        if (month > 11) {
            month = 0;
            year = year + 1;
        }
        if (month < 0) {
            month = 11;
            year = year - 1;
        }
        const params = new URLSearchParams(searchParams);

        params.set('month', month.toString());
        params.set('date', date.toString());
        params.set('year', year.toString());
        

        setCurrMonth(month);

        setCurrYear(year);
        setSelectedDate(new Date(year, month, date));

        replace(`${pathname}?${params.toString()}`, {scroll: false});
    }

    function handleMonthClick(month: number) {
        if (month < 0) {
            setCurrMonth(11);
            setCurrYear(currYear - 1);
            return;
        }
        if (month > 11) {
            setCurrMonth(0);
            setCurrYear(currYear + 1);
            return;
        }

        setCurrMonth(Math.min(Math.max(month, 0), 11));
    }

    useEffect(() => {

        const dayOffset = firstDayOfWeek(currDateObj);


        const updatedDateElements = [];

        for (let i = 0; i < dayOffset; i++) {
            updatedDateElements.push(
                <button
                    onClick={() => handleDateClick((getDaysInMonth(currMonth - 1, currYear) + (i + 1)) - dayOffset, currMonth - 1, currYear)}
                    className={`${isCurrSelected((getDaysInMonth(currMonth - 1, currYear) + (i + 1)) - dayOffset, currMonth - 1, currYear) ? "font-bold border-brand-yellow bg-white" : ""} size-[14%] grow border hover:bg-blue-100 border-slate-200 aspect-square bg-gray-400 flex flex-col p-1`}>
                    {(getDaysInMonth(currMonth - 1, currYear) + (i + 1)) - dayOffset}
                </button>
            )
        }

        for (let i = 0; i < getDaysInMonth(currMonth, currYear); i++) {
            updatedDateElements.push(
                <button onClick={() => handleDateClick(i + 1, currMonth, currYear)}
                        className={`${isCurrSelected(i + 1, currMonth, currYear) ? "font-bold border-brand-yellow bg-white" : ""} size-[14%] grow hover:bg-blue-100 border border-slate-200 aspect-square bg-slate-50 flex flex-col p-1`}
                        key={i}>
                    {i + 1}
                    {
                        calendarItems?.filter(x => {
                            return hasEventToday(x, new Date(currYear, currMonth, i + 1));
                        }).map((item) => {
                            return <div className="text-sm font-normal w-full bg-blue-100 mb-1"
                                        key={item.id}>{item.title}</div>
                        })
                    }
                </button>
            )
        }

        const lastDayOfMonth = lastDayOfWeek(new Date(currYear, currMonth, getDaysInMonth(currMonth, currYear)));


        for (let i = 0; i < 6 - lastDayOfMonth; i++) {
            updatedDateElements.push(
                <button
                    onClick={() => handleDateClick((i + 1), currMonth + 1, currYear)}
                    className={`${isCurrSelected((i + 1), currMonth + 1, currYear) ? "font-bold border-brand-yellow bg-white" : ""} size-[14%] grow border hover:bg-blue-100 border-slate-200 aspect-square bg-gray-400 flex flex-col p-1`}>
                    {i + 1}
                </button>
            )
        }

        setDateElements(updatedDateElements);
    }, [calendarItems, currDateObj, currMonth, currYear, handleDateClick, isCurrSelected]);

    useEffect(() => {
        setCurrentDateObj(new Date(currYear, currMonth, 1));
    }, [currYear, currMonth]);


    return <div className="max-w-screen-lg mx-auto">
        <div className="flex justify-between">
            <button onClick={() => handleMonthClick(currMonth - 1)}>prev</button>
            <DatePicker dateFormat="MMMM, yyyy" selected={currDateObj} onChange={(date)=>{
                if (date){
                    handleDateClick(date.getDate(),date.getMonth(),date.getFullYear())
                }
                setSelectedDate(date);
            }}/>
            <button onClick={() => handleMonthClick(currMonth + 1)}>next</button>
        </div>
        <div className="flex">
            <div className="font-bold w-[14%] grow text-center">Su</div>
            <div className="font-bold w-[14%] grow text-center">Mo</div>
            <div className="font-bold w-[14%] grow text-center">Tu</div>
            <div className="font-bold w-[14%] grow text-center">We</div>
            <div className="font-bold w-[14%] grow text-center">Th</div>
            <div className="font-bold w-[14%] grow text-center">Fr</div>
            <div className="font-bold w-[14%] grow text-center">Sa</div>
        </div>
        <div className="flex flex-wrap">
            {dateElements.map(x => x)}
        </div>
        <div>
            {
                selectedDate
                    ?
                    <h3 className={`font-ptserif text-center font-bold underline underline-offset-8 decoration-brand-yellow decoration-4 text-3xl mb-6 mt-2`}>
                        Happening {selectedDate?.getMonth() + 1}/{selectedDate.getDate()}/{selectedDate.getFullYear()}
                    </h3>
                    : ""
            }
            {
                selectedDate
                    ?
                    calendarItems?.filter(x => hasEventToday(x, new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()))).map((item) => {
                        return <div className="text-center mb-6" key={item.id}>
                            <h4 className="font-bold text-xl">{item.title} {item.location ? `- ${item.location}` : ""} </h4>
                            {
                                item.description ? <div className="max-w-prose mx-auto">{item.description}</div> : ""
                            }
                            {
                                item?.times?.map(time => {
                                    if (!time.hour_start || !time.hour_end) return;

                                    const startTime = new Date(time.hour_start);
                                    const startAmPm = startTime.getHours() <= 11 ? "AM" : "PM";
                                    const startHour = (startAmPm === "AM" ? startTime.getHours() : startTime.getHours() - 12) || 12;

                                    if (time.hour_start && !time.hour_end) {
                                        return <div key={time.id}>
                                            {startHour}:{startTime.getMinutes()}
                                        </div>
                                    }
                                    const endTime = new Date(time.hour_end);
                                    const endAmPm = endTime.getHours() <= 11 ? "AM" : "PM";
                                    const endHour = (endAmPm === "AM" ? endTime.getHours() : endTime.getHours() - 12) || 12;

                                    return <div key={time.id}>
                                        {startHour}:{startTime.getMinutes()}{startAmPm === endAmPm ? "" : startAmPm} - {endHour}:{endTime.getMinutes()}{endAmPm}
                                    </div>


                                })
                            }
                            {
                                item.eventPage && typeof item?.eventPage?.value !== "number"
                                    ? <Link className="italic font-bold underline"
                                            href={"/event/" + item.eventPage.value.slug || "/"}>More</Link>
                                    : ""
                            }
                        </div>
                    })
                    : ""
            }
        </div>
    </div>
}
