import { reducer } from './reducer';
import Storage from '../utils/storage';
import { AppState, Observer, Screens } from '../types/store';

const initialState: AppState = {
    screen: Screens.USERPROFILE,
    publications: [],
    user: null,
};

export let appState = Storage.get('STORE', initialState);

let observers: Observer[] = [];

const persistStore = (state: AppState) => {
    Storage.set('STORE', state);
};

export const dispatch = (action: any) => {
    const clone = JSON.parse(JSON.stringify(appState));
    const newState = reducer(action, clone);
    appState = newState;

    persistStore(newState);
    observers.forEach((observer) => observer.render());
};

export const addObserver = (observer: Observer) => {
    observers = [...observers, observer];
};
