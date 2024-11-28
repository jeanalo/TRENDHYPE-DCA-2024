export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
	publications: [];
	user: string;
	friend : string;
	moodmsg : string;
	
};

export enum PersistanceKeys {
	"STORE" = "STORE",
  }  

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
	'FRIENDPROFILE' = 'FRIENDPROFILE',
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
	SETFRIEND = 'SETFRIEND',
	SETMOODMSG = 'SETMOODMSG'
}

