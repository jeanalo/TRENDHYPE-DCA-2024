// src/types/store.ts

export type Observer = { render: () => void } & HTMLElement;

export type User = {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    country?: string;
    city?: string;
    username: string;
    description?: string;
    profileImage?: string;
};

export type AppState = {
    screen: string;
    publications: any[];
    user: User | null;
};

export enum Screens {
    REGISTER = 'REGISTER',
    LOGIN = 'LOGIN',
    DASHBOARD = 'DASHBOARD',
    SETTINGS = 'SETTINGS',
}

export enum Actions {
    NAVIGATE = 'NAVIGATE',
    GETPOSTS = 'GETPOSTS',
    SET_USER = 'SET_USER',
    UPDATE_USER = 'UPDATE_USER',
}
