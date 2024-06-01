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
    email: string;
    subscription_date: string;
    address: string;
    cf: string;
    phone: string;
    birth_date: Date;
    birth_place: string;
    cap: string;
    extra?: string;
}

export interface Subscription {
    id: number;
    course_id: number;
    customer_id: number;
    code: string;
    title: string;
    price: string;
    subscription_date: string;
    phone: string;
    birth_date: string;
    extra?: string;
}

export interface Payment {
    id: number;
    method: string;
    payment_date: Date;
    amount: number;
}

type CustomerWithSubscription = Customer & Subscription;
