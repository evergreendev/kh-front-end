import {Hour} from "@/app/types/payloadTypes";

type Hours = {
    title?: string | null;
    hour_start?: string | null;
    hour_end?: string | null;
    id?: string | null;
}

export const getCurrentSchedule = (hour: Hour) => {
    const schedules = hour.Schedules

    if (!schedules) return null;
    const now = new Date().getTime();

    return schedules.find((schedule) => {
        if (!schedule.schedule_start) return false;
        if (!schedule.schedule_end) return false;

        const start = new Date(schedule.schedule_start).getTime();
        const end = new Date(schedule.schedule_end).getTime();

        return now > start && now < end;
    })
}

const getHourText = (hour: number, minutes: string) => {
    const a = hour > 12 ? "pm" : "am";
    const hourText = a === "am" ? hour : hour - 12;

    return hourText + ":" + minutes + a;
}

export const getHoursFromSchedule = (hours: Hours) => {
    if (!hours.hour_start || !hours.hour_end) return null;
    const start = new Date(hours.hour_start);
    const end = new Date(hours.hour_end);

    return getHourText(start.getHours(), (start.getMinutes() < 10 ? '0' : '') + start.getMinutes()) + "-" + getHourText(end.getHours(), (end.getMinutes() < 10 ? '0' : '') + end.getMinutes());
}
