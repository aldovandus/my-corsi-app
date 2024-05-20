import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getInitials = (firstname: string, lastname: string) => {
    if (!firstname || !lastname) {
        return "";
    }

    const firstInitial = firstname.charAt(0).toUpperCase();
    const lastInitial = lastname.charAt(0).toUpperCase();

    return `${firstInitial}${lastInitial}`;
};
