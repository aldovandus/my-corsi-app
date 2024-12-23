import { RouteParams } from "../../../vendor/tightenco/ziggy/src/js";

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
    price: string;
    startDate: Date;
    endDate: Date;
    startStage: Date;
    endDate10: Date;
    examDate: Date;
    stageLocation: string;
    startTime: string;
    endTime: string;
    classroom: string;
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
    subscription_date: Date;
    phone: string;
    birth_date: string;
    exam_result: boolean;
    extra?: string;
    total?: string;
}

export interface Payment {
    id: number;
    payment_number: number;
    invoice_number: string;
    method: string;
    payment_date: Date;
    amount: number;
}

export type BreadcrumbRoute = {
    label: string;
    url?: string;
    urlParams?: RouteParams<string>;
};

type CustomerWithSubscription = Customer & Subscription;
type SubscriptionWithCustomerAndCourse = Subscription & Customer & Course;
