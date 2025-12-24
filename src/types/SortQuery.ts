import {SortOrder} from "mongoose";

// export type SortQuery<T extends Record<string, string | number>> = {
//     [K in T[keyof T]]?: SortOrder;
// };

export type SortQuery<T extends Record<string, string>> =
    Partial<Record<T[keyof T], SortOrder>>;
