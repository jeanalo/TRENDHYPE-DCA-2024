import { Actions } from '../types/store';

export const reducer = (currentAction: any, currentState: any) => {
    const { action, payload } = currentAction;

    switch (action) {
        case Actions.NAVIGATE:
            return {
                ...currentState,
                screen: payload,
            };
            
        case Actions.GETPOSTS:
                return {
                    ...currentState,
                    publications: payload,  
                };

                
        case Actions.SETUSER:
            return {
                ...currentState,
                user: payload,
            };

        case Actions.UPDATEUSER:
            return {
                ...currentState,
                user: { ...currentState.user, ...payload },
            };

        default:
            return currentState;
    }
};
