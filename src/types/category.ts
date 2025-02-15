interface Category {
    id: string;
    name: string;
    icon: string;
}

interface CreateCategory{
    name: string;
    icon: string;
}

interface CategoryCount {
    name: string;
    count: number;
}