interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    resetCode?: string;
    resetCodeExpiration?: Date;
}
