export interface Service {
    id: string;
    createdAt: Date;
    name: string;
    description: string;
    categoriesIds: number[];
    categories: Category[];
    visible: boolean;
    images: string[];
}

export interface serviceData {
    name: string;
    description: string;
    categoriesIds: number[];
    visible: boolean;
    images: string[];
}
