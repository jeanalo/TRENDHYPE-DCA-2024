export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
	publications: [];
};

export enum Screens {
	'REGISTER' = 'REGISTER',
	'LOGIN' = 'LOGIN',
	'DASHBOARD' = 'DASHBOARD',
	'DASHBOARDFOllOWING' = 'DASHBOARDFOLLOWING',
	'QUESTIONOFTHEDAY' = 'QUESTIONOFTHEDAY',
	'USERRPROFILE' = 'USERPROFILE',
	'MYFAVORITES' = 'MYFAVORITES',
	'CREATEPOST' = 'CREATEPOST',
	'USERSETTINGS' = 'USERSETTINGS',


}

export enum Actions {
	'NAVIGATE' = 'NAVIGATE',
	'GETPOSTS' = 'GETPOSTS',
	'SETUSERCREDENTIALS' = 'SETUSERCREDENTIALS',
}