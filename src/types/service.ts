export interface Service {
    id: string;
    createdAt: Date;
    name: string;
    description: string;
    shortDescription: string;
    categoriesIds: number[];
    categories: Category[];
    visible: boolean;
    images: string[];
}

export interface serviceData {
    name: string;
    description: string;
    shortDescription: string;
    categoriesIds: number[];
    visible: boolean;
    images: string[];
}
