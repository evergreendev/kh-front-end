"use client"

import {ReactNode, useCallback, useEffect, useState} from "react";

const firstDayOfWeek = (date = new Date()) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

const lastDayOfWeek = (date = new Date()) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

function getDaysInMonth(month: number, year: number): number {
    if (month > 11){
        month = 0;
        year = year + 1;
    }
    if (month < 0){
        month = 11;
        year = year - 1;
    }
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    return month === 1 && year % 4 === 0 ? 29 : daysInMonth[month];
}

export const CalendarBlock = () => {
    const dateObj = new Date();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [currDateObj, setCurrentDateObj] = useState(dateObj);
    const [currDate, setCurrentDate] = useState(currDateObj.getDate());
    const [currMonth, setCurrMonth] = useState<number>(dateObj.getMonth());
    const [currYear, setCurrYear] = useState<number>(dateObj.getFullYear());
    const [dateElements, setDateElements] = useState<ReactNode[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
        setCurrentDate(date);

        setCurrMonth(month);

        setCurrYear(year);
        setSelectedDate(new Date(year, month, date));
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

        console.log(currDateObj.toDateString())

        const updatedDateElements = [];

        for (let i = 0; i < dayOffset; i++) {
            updatedDateElements.push(
                <button
                    onClick={() => handleDateClick((getDaysInMonth(currMonth - 1, currYear) + (i + 1)) - dayOffset, currMonth - 1, currYear)}
                    className={`${isCurrSelected((getDaysInMonth(currMonth - 1, currYear) + (i + 1)) - dayOffset,currMonth-1,currYear) ? "font-bold border-brand-yellow bg-white":""} size-[14%] grow border hover:bg-blue-100 border-slate-200 aspect-square bg-gray-400 flex flex-col p-1`}>
                    {(getDaysInMonth(currMonth - 1, currYear) + (i + 1)) - dayOffset}
                </button>
            )
        }

        for (let i = 0; i < getDaysInMonth(currMonth, currYear); i++) {
            updatedDateElements.push(
                <button onClick={() => handleDateClick(i + 1, currMonth, currYear)}
                        className={`${isCurrSelected(i+1,currMonth,currYear) ? "font-bold border-brand-yellow bg-white":""} size-[14%] grow hover:bg-blue-100 border border-slate-200 aspect-square bg-slate-50 flex flex-col p-1`}
                        key={i}>
                    {i + 1}
                </button>
            )
        }

        const lastDayOfMonth = lastDayOfWeek(new Date(currYear, currMonth, getDaysInMonth(currMonth, currYear)));


        for (let i = 0; i < 6-lastDayOfMonth; i++){
            updatedDateElements.push(
                <button
                    onClick={() => handleDateClick((i+1), currMonth + 1, currYear)}
                    className={`${isCurrSelected((i+1),currMonth + 1,currYear) ? "font-bold border-brand-yellow bg-white":""} size-[14%] grow border hover:bg-blue-100 border-slate-200 aspect-square bg-gray-400 flex flex-col p-1`}>
                    {i+1}
                </button>
            )
        }

        setDateElements(updatedDateElements);
    }, [currDateObj, currMonth, currYear, isCurrSelected]);

    useEffect(() => {
        setCurrentDateObj(new Date(currYear, currMonth, 1));
    }, [currYear, currMonth]);


    return <div className="max-w-screen-lg mx-auto">
        <div className="flex justify-between">
            <button onClick={() => handleMonthClick(currMonth - 1)}>prev</button>
            {monthNames[currMonth]} {currYear}
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
    </div>
}
