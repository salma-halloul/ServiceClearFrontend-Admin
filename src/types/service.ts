interface Service {
    id: string;
    createdAt: Date;
    name: string;
    description: string;
    categoriesIds: number[];
    visible: boolean;
    images: string[];
}