export interface UserDomain {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;
}