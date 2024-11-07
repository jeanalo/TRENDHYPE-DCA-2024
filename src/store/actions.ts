import { Actions, Screens } from '../types/store';
import { getPosts } from '../utils/firebase';

export const navigate = (screen: Screens) => {
	return {
		action: Actions.NAVIGATE,
		payload: screen,
	};
};

export const fetchPostsAction = async () => {
    try {
        const posts = await getPosts();

        return {
            action: Actions.GETPOSTS,
            payload: posts, // Asegúrate de que `posts` es un array sin duplicados
        };
    } catch (error) {
        console.error('Error fetching posts:', error);
        return {
            action: Actions.GETPOSTS,
            payload: [], // En caso de error, retorna un array vacío
        };
    }
};

export const setUser = (user: any) => {
    return {
        action: Actions.SETUSER,
        payload: user,
    };
};

export const setUserCredentials = (user: string) => {
	return {
		action: Actions.SETUSERCREDENTIALS,
		payload:user,
	};
};