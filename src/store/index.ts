import { reducer } from './reducer';
import Storage from '../utils/storage';
import { AppState, Observer, PersistanceKeys } from '../types/store';
import { Screens } from '../types/store';
import { onAuthStateChanged } from 'firebase/auth';
import {getFirebaseInstance} from '../utils/firebase'
import { navigate, setUserCredentials } from './actions';

const onAuth = async () => {
	const { auth } = await getFirebaseInstance();
	onAuthStateChanged(auth, (user: any) => {
		if (user) {
			user.uid !== null ? dispatch(setUserCredentials(user.uid)) : ''; // Guarda el id del usuario
			dispatch(navigate(Screens.DASHBOARD)); // Navega al dashboard
		} else if (appState.screen === Screens.DASHBOARD) {
			dispatch(navigate(Screens.LOGIN)); // Navega a login si no hay usuario autenticado
		}
	});
};

onAuth()

const initialState: AppState = {
    screen: Screens.LOGIN,
    publications: [],
    user: '',
	friend : '',
	moodmsg : ''
};


export let appState = initialState;

let observers: Observer[] = [];

const persistStore = (state: AppState) => {
	Storage.set(PersistanceKeys.STORE, JSON.stringify(state));

};

export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState)); // Clona el estado actual
	const newState = reducer(action, clone); // Genera el nuevo estado usando el reducer
	console.log(`estado actualizado desde ${action.action} y ${action.payload}`);
	appState = newState;


	persistStore(newState);
	// Notifica a los observadores para que se actualicen
	observers.forEach((o: any) => o.render());
};


export const addObserver = (ref: any) => {
    observers = [...observers, ref];
};