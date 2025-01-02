export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    resetCode?: string;
    resetCodeExpiration?: Date;
}

export interface updateUser {
    username: string;
    email: string;
}

export interface ResetPasswordPayload {
    oldPassword: string;
    newPassword: string;
}
