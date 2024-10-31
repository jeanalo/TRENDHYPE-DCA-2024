import { reducer } from './reducer';
import Storage from '../utils/storage';
import { AppState, Observer } from '../types/store';

const initialState: AppState = {
	screen: 'REGISTER',
	publications: [],
	//user: {},
};

export let appState = Storage.get('STORE', initialState);

let observers: Observer[] = [];

const persistStore = (state: any) => {
	Storage.set('STORE', state);
};

export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	const newState = reducer(action, clone);
	appState = newState;

	persistStore(newState);
	observers.forEach((o: any) => o.render());
};

export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};