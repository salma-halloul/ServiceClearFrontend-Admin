interface Quote {
    id: string;
    name: string;
    email: string;
    phonenumber: number;
    servicesIds: number[];
    message?: string;
    createdAt: Date;
    read: boolean;
    status: string;
}