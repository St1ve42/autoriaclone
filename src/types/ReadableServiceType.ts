export type ReadableServiceType<T, ID = string> = {
    get(id: ID): Promise<T>;
}