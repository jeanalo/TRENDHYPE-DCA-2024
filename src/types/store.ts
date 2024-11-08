
export type Observer = {
    render: () => void;
  };
  


export interface AppState {
    screen: Screens;
    publications: postTypes[];
    user: string; }


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
    ADDPOSTS = 'ADDPOSTS',
    GETPRODUCTSBYUSER = 'GETPRODUCTSBYUSER',
}

export interface postTypes {
    image?: string;
    description?: string;
  }

