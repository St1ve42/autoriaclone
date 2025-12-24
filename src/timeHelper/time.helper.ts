import dayjs, {ManipulateType} from "dayjs";

export class TimeHelper{
    public static addTime(value: number, unit: ManipulateType){
        return dayjs().add(value, unit).toDate()
    }

    public static subTime(value: number, unit: ManipulateType){
        return dayjs().subtract(value, unit).toDate()
    }

    public static getISOStringDate(date: Date){
        return date.toISOString().slice(0, 10)
    }

    public static getISOStringDateNow(){
        return new Date().toISOString().slice(0, 10)
    }

    public static toDateNowOnlyUTC(): Date {
        const now = new Date()
        return new Date(Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate()
        ))
    }

    public static toDateOnlyUTC(date: Date): Date {
        return new Date(Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate()
        ))
    }


}