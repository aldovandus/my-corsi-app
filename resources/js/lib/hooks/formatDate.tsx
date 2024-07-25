import { format } from "date-fns";
import { it } from "date-fns/locale";

function formatDate(date: Date) {
    try {
        return format(date, "PPP", { locale: it });
    } catch (error) {
        if (error instanceof RangeError) {
            console.error("Invalid time value:", error);
            // Gestisci l'errore come preferisci, ad esempio ritornando una stringa vuota
            return "Data non valida";
        } else {
            // Propaga altri errori
            throw error;
        }
    }
}

export default formatDate;
