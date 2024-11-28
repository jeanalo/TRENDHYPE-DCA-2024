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

		
			case Actions.SETUSERCREDENTIALS:
			return {
				...currentState,
				user: payload,
			};

			case Actions.UPDATEUSER:
            return {
                ...currentState,
                user: { ...currentState.user, ...payload },
            };
			case Actions.SETFRIEND:
            return {
                ...currentState,
                friend : payload,
            };
			case Actions.SETMOODMSG:
            return {
                ...currentState,
                moodmsg : payload,
            };

		default:
			return currentState;

			
	}

	
};

