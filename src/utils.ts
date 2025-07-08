//create className from object
export const cln = (clsObject: Object) => {
    return Object.entries(clsObject)
        .filter(([,val]) => val)
        .map(([key]) => key)
        .join(" ");
}

export function capitalizeFirst(text: String): String {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function normalizeDiacritics(text: string): string {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

export function extractErrorMessage(err: unknown, fallback = "Chyba!"): string {
    if (err instanceof Error) {
      return err.message;
    }

    if (typeof err === 'string') {
      return err;
    }
    
    try {
      return JSON.stringify(err);
    } 
    catch {
      return fallback;
    }
  }