import {Admission} from "@/app/types/payloadTypes";

export const getFutureAdmissions = (admission: Admission) => {
    const admissions = admission.Admissions

    if (!admissions) return null;

    return admissions.filter((admission) => {
        if (!admission.admission_start) return false;
        if (!admission.admission_end) return false;

        const start = new Date(admission.admission_start);
        start.setUTCHours(0,0,0,0);
        const end = new Date(admission.admission_end);
        const today = new Date();
        today.setUTCHours(0,0,0,0);

        end.setUTCHours(23,59,59,999);

        return today.getTime() <= end.getTime()
    })
}

export const getCurrentAdmission = (admission: Admission) => {
    const admissions = admission.Admissions

    if (!admissions) return null;

    return admissions.find((admission) => {
        if (!admission.admission_start) return false;
        if (!admission.admission_end) return false;

        const start = new Date(admission.admission_start);
        start.setUTCHours(0,0,0,0);
        const end = new Date(admission.admission_end);
        const today = new Date();
        today.setUTCHours(0,0,0,0);

        end.setUTCHours(23,59,59,999);

        return today.getTime() >= start.getTime() && today.getTime() < end.getTime();
    })
}
