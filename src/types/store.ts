export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
	publications: postTypes[];
	user: string;
	
};

export interface Favorite {
    img: string;
    description: string;
}

export enum Screens {
	'REGISTER' = 'REGISTER',
	'LOGIN' = 'LOGIN',
	'DASHBOARD' = 'DASHBOARD',
	'DASHBOARDFOllOWING' = 'DASHBOARDFOLLOWING',
	'QUESTIONOFTHEDAY' = 'QUESTIONOFTHEDAY',
	'USERPROFILE' = 'USERPROFILE',
	'MYFAVORITES' = 'MYFAVORITES',
	'CREATEPOST' = 'CREATEPOST',
	'USERSETTINGS' = 'USERSETTINGS',

}

export enum Actions {
    NAVIGATE = 'NAVIGATE',
    GETPOSTS = 'GETPOSTS',
    SETUSER = 'SETUSER',
    UPDATEUSER = 'UPDATEUSER',
    SETUSERCREDENTIALS = 'SETUSERCREDENTIALS',
    ADDPOSTS = 'ADDPOSTS',
    GETPRODUCTSBYUSER = 'GETPRODUCTSBYUSER',
	ADD_FAVORITE = 'ADD_FAVORITE',
}

export interface postTypes {
    image?: string;
    description?: string;
  }