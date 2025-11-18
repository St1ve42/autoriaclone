export const stub = (method: string, routeName: string) => {
    return {
        message: `Api route ${method + ' ' + routeName} works`
    }
}