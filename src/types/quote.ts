import { Service } from "./service";

export interface Quote {
    id: string;
    name: string;
    email: string;
    phonenumber: number;
    servicesIds: number[];
    services: Service[];
    message?: string;
    createdAt: Date;
    read: boolean;
    status: string;
    zip: number;
}