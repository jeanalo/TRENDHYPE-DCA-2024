import { reducer } from './reducer';
import Storage from '../utils/storage';
import { AppState, Observer } from '../types/store';
import { Screens } from '../types/store';

const initialState: AppState = {
    screen: Screens.CREATEPOST,
    publications: [],
};


export let appState = Storage.get('STORE', initialState);

let observers: Observer[] = [];

const persistStore = (state: any) => {
    Storage.set('STORE', state);
};

export const dispatch = (action: any) => {
    const clone = JSON.parse(JSON.stringify(appState));
    const newState = reducer(action, clone);

    // Verificar si el estado realmente cambió antes de actualizar
    if (JSON.stringify(appState) !== JSON.stringify(newState)) {
        appState = newState;
        persistStore(newState);
        console.log('Nuevo estado después del dispatch:', appState);

        // Llamar a render solo si hay un cambio real
        observers.forEach((o: any) => o.render());
    }
};


export const addObserver = (ref: any) => {
    observers = [...observers, ref];
};
