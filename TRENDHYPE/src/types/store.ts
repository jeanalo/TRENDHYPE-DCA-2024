export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
	publications: [];
};

export enum Screens {
	'REGISTER' = 'REGISTER',
	'LOGIN' = 'LOGIN',
	'DASHBOARD' = 'DASHBOARD',
}

export enum Actions {
	'NAVIGATE' = 'NAVIGATE',
	'GETPOSTS' = 'GETPOSTS',
}