import { format } from "date-fns";
import { it } from "date-fns/locale";
import { ReactElement, ReactNode } from "react";

function formatDate(date: Date, onError?: ReactNode | string) {
    try {
        return format(date, "PPP", { locale: it });
    } catch (error) {
        if (error instanceof RangeError) {
            console.error("Invalid time value:", error);
            // Gestisci l'errore come preferisci, ad esempio ritornando una stringa vuota
            return onError ? onError : "Data non valida";
        } else {
            // Propaga altri errori
            throw error;
        }
    }
}

export default formatDate;
