export interface IUsersProps {
    name: string;
    email: string;
    password: string;
}

export interface IUsersReturn {
    name: string;
    email: string;
}

export interface IUsersFindBy {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string | null;
}