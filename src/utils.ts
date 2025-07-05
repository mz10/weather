//create className from object
export const cln = (clsObject: Object) => {
    return Object.entries(clsObject)
        .filter(([key,val]) => val)
        .map(([key]) => key)
        .join(" ");
}