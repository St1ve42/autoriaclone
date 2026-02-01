import dayjs, {ManipulateType} from "dayjs";

export class TimeHelper{
    public static addTime(value: number, unit: ManipulateType){
        return dayjs().add(value, unit).toDate()
    }

    public static subTime(value: number, unit: ManipulateType){
        return dayjs().subtract(value, unit).toDate()
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

    public static parseTime(time: string): {value: number, unit: ManipulateType}{
        const startIndexOfLetter = time.search(/[a-zA-z]/g)
        return {value: Number(time.slice(0,startIndexOfLetter)), unit: time.slice(startIndexOfLetter) as ManipulateType}
    }


}