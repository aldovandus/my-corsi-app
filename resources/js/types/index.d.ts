export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

export interface Course {
    id: number;
    code: string;
    title: string;
    descritpion?: string;
    startDate: string;
    endDate: string;
    price: string;
    extra?: string;
}

export interface Customer {
    id: number;
    firstname: string;
    lastname: string;
    cf: string;
    phone: string;
    birth_date: string;
}
