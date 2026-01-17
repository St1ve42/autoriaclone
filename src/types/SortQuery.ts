export type SortQuery<T extends Record<string, string>> =
    Partial<Record<T[keyof T], -1 | 1>>;
