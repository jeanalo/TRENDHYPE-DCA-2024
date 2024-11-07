
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
    publications: postTypes[];
    user: User | null;
};

export enum Screens {
    REGISTER = 'REGISTER',
    LOGIN = 'LOGIN',
    DASHBOARD = 'DASHBOARD',
    USERPROFILE = 'USERPROFILE',
    MYFAVORITES = 'MYFAVORITES',
    CREATEPOST = 'CREATEPOST',
    USERSETTINGS = 'USERSETTINGS',
}


export enum Actions {
    NAVIGATE = 'NAVIGATE',
    GETPOSTS = 'GETPOSTS',
    SETUSER = 'SETUSER',
    UPDATEUSER = 'UPDATEUSER',
    SETUSERCREDENTIALS = 'SETUSERCREDENTIALS',
    ADDPOSTS = 'ADDPOSTS'
}


export interface postTypes {
    image?: string;
    description?: string;
  }
  