export type StatisticsType = {
    total_views: number,
    views: Record<"day" | "week" | "month", number>
    average_price: Record<"region" | "country", {value: number | null, vehicles_count: number}> & {currency: "USD"}
}