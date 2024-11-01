import { Actions, Screens } from '../types/store';
import { getPosts } from '../utils/firebase';

export const navigate = (screen: Screens) => {
	return {
		action: Actions.NAVIGATE,
		payload: screen,
	};
};

export const getProductsAction = async () => {
	const products = await getPosts();
	return {
		action: Actions.GETPOSTS,
		payload: products,
	};
};

export const setUserCredentials = (user: string) => {
	return {
		action: Actions.SETUSERCREDENTIALS,
		payload: user,
	};
};