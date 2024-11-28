import { DashboardSectionItem } from '../types/dashboardforyoutypes';
import { Actions, Screens } from '../types/store';
import { getPosts } from '../utils/firebase';

export const navigate = (screen: Screens) => {
	return {
		action: Actions.NAVIGATE,
		payload: screen,
	};
};

export const getPublications = async () => {
	const posts = await getPosts();
	return {
		action: Actions.GETPOSTS,
		payload: posts as DashboardSectionItem[],
	};
};


export const setUserCredentials = (user: string) => {
	return {
		action: Actions.SETUSERCREDENTIALS,
		payload:user,
	};
};

export const setFriend = (id : string) => {
	return {
		action : Actions.SETFRIEND,
		payload : id,
	}
}
export const setMoodMsg = (msg : string) => {
	return {
		action : Actions.SETMOODMSG,
		payload : msg,
	}
}

