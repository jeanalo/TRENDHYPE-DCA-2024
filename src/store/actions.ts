import { Actions, Screens } from '../types/store';
import { getPosts } from '../utils/firebase';

export const navigate = (screen: Screens) => {
	return {
		action: Actions.NAVIGATE,
		payload: screen,
	};
};

export const fetchPostsAction = async () => {
    const posts = await getPosts();
    return {
        action: Actions.GETPOSTS,
        payload: posts,
    };
};

export const setUser = (user: any) => {
    return {
        action: Actions.SETUSER,
        payload: user,
    };
};