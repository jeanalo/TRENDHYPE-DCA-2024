import { fetchPostsAction, navigate } from "../../store/actions";   
import { dispatch, appState } from "../../store/index";
import { Screens } from "../../types/store";
import PostCard, { PostCardAttribute } from '../../components/Post/post-card/post-card';
import UserSideCard, { UserSideCardAttribute } from '../../components/userSettings/userSideCard/userSideCard';
import FriendCard, { FriendCardAttribute } from '../../components/userProfile/userfriends';

class UserFeedScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        this.render();
        await this.loadPosts();
        this.subscribeToNewPosts();
    }

    async loadPosts() {
        if (!appState.publications || appState.publications.length === 0) {
            const postsAction = await fetchPostsAction();
            dispatch(postsAction);
        }
        this.renderPosts();
    }

    subscribeToNewPosts() {
        appState.subscribe('publications', this.renderPosts.bind(this));
    }

  

    renderPosts() {
        const postContainer = this.shadowRoot?.querySelector("#posts-container");
        if (!postContainer) {
            console.log("postContainer no encontrado en el DOM.");
            return;
        }

        postContainer.innerHTML = '';

        if (appState.publications.length === 0) {
            console.log("No se encontraron publicaciones para renderizar.");
            postContainer.innerHTML = '<p>No hay publicaciones disponibles.</p>';
            return;
        }

        appState.publications.forEach((post: any) => {
            const postElement = new PostCard();
            postElement.setAttribute(PostCardAttribute.image, post.image || "");
            postElement.setAttribute(PostCardAttribute.description, post.description || "");
            postContainer.appendChild(postElement);
            console.log('Post renderizado:', post);
        });
    }

    navigateToCreatePost() {
        dispatch(navigate(Screens.CREATEPOST));
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: Arial, sans-serif;
                    }

                    #user-feed-container {
                        display: flex;
                        flex-direction: row;
                        width: 100vw;
                        height: 100vh;
                        background-color: #232106;
                        color: #FCF3E4;
                    }

                    .sidebar {
                        width: 250px;
                        padding: 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-right: 20px;
                    }

                    .main-content {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        padding: 20px;
                        overflow-y: auto;
                    }

                    .add-button {
                        padding: 10px 20px;
                        background-color: #E2D54B;
                        color: #232106;
                        font-size: 0.7rem;
                        font-weight: bold;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                        margin-bottom: 20px;
                        align-self: flex-start;
                    }

                    .add-button:hover {
                        background-color: #C5B247;
                    }

                    .friends-container {
                        margin-bottom: 40px;
                    }

                    .friends-title {
                        font-size: 1.5 rem;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }

                    #friends-list {
                        display: flex;
                        gap: 10px;
                        overflow-x: auto;
                        padding-bottom: 10px;
                    }

                    .feed-title {
                        font-size: 1.5rem;
                        font-weight: bold;
                        margin: 20px 0;
                    }

                    #posts-container {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: flex-start;
                        gap: 16px;
                        padding-left: 10px;
                    }

                    @media (max-width: 768px) {
                        #user-feed-container {
                            flex-direction: column;
                        }

                        .sidebar {
                            width: 100%;
                            padding: 10px;
                            align-items: center;
                        }

                        .main-content {
                            padding: 10px;
                        }

                        .feed-title, .friends-title {
                            font-size: 1.5rem;
                            text-align: center;
                        }

                        #posts-container {
                            gap: 10px;
                            justify-content: center;
                        }
                    }
                </style>
                
                <div id="user-feed-container">
                    <div class="sidebar">
                    </div>

                    <div class="main-content">
                        <button class="add-button" id="add-button">Add</button>

                        <div class="friends-container">
                            <div class="friends-title">Friends</div>
                            <div id="friends-list"></div>
                        </div>

                        <div class="feed-title">Feed</div>
                        <section id="posts-container"></section>
                    </div>
                </div>
            `;

            const addButton = this.shadowRoot.querySelector("#add-button");
            addButton?.addEventListener("click", this.navigateToCreatePost);

            const userSideCardComponent = new UserSideCard();
            userSideCardComponent.setAttribute(UserSideCardAttribute.name, 'Jean Alomia');
            userSideCardComponent.setAttribute(UserSideCardAttribute.username, '@Jeanalomia');
            userSideCardComponent.setAttribute(UserSideCardAttribute.description, 'Chasing dreams and making memories');

            const sidebar = this.shadowRoot.querySelector('.sidebar');
            sidebar?.appendChild(userSideCardComponent);

            const friendsList = this.shadowRoot.querySelector('#friends-list');
            const friends = [
                { username: 'Luna', image: 'https://i.pinimg.com/564x/7e/b6/38/7eb63851a0a63a09fa94275805fbd47b.jpg' },
                { username: 'Juan', image: 'https://i.pinimg.com/564x/ea/56/dc/ea56dc7075c619f0738f77661a3a44fb.jpg' },
            ];

            friends.forEach(friend => {
                const friendCard = document.createElement('friend-card') as FriendCard;
                friendCard.setAttribute(FriendCardAttribute.image, friend.image);
                friendCard.setAttribute(FriendCardAttribute.username, friend.username);
                friendsList?.appendChild(friendCard);
            });

            this.loadPosts();
        }
    }
}

customElements.define("user-feed-screen", UserFeedScreen);
export default UserFeedScreen;
