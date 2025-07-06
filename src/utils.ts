//create className from object
export const cln = (clsObject: Object) => {
    return Object.entries(clsObject)
        .filter(([key,val]) => val)
        .map(([key]) => key)
        .join(" ");
}

export function capitalizeFirst(text: String): String {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}