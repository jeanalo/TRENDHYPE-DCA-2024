import { appState, dispatch } from "../../store/index";
import { Screens } from "../../types/store";
import FriendCard, { FriendCardAttribute } from '../../components/userProfile/userfriends';
import UserSideCard, { UserSideCardAttribute } from "../../components/userSettings/userSideCard/userSideCard";
import { navigate } from "../../store/actions";
import { getFollowingUsers, getPostByUser, getUserByUID } from "../../utils/firebase";
import { DashboardSectionItem } from "../../types/dashboardforyoutypes";
import MyCard, { Attribute } from "../../components/Card/Card";

class UserFeedScreen extends HTMLElement {
    userid?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ["userid"];
    }

    attributeChangedCallback(name: string, oldValue: string | undefined, newValue: string | undefined) {
        if (name === "userid" && newValue !== oldValue) {
            this.userid = newValue;
            this.renderPosts();
            this.renderFollowingUsers();
        }
    }

    connectedCallback() {
        this.render();
        this.bindEvents();
        this.getUserData();
    }

    async getUserData() {
        const userID = this.userid;
        if (!userID) {
            console.error('No se proporcionó el UID del amigo.');
            return;
        }

        const user = await getUserByUID(userID);
        if (user) {
            const userSideCard = new UserSideCard();
            userSideCard.setAttribute(UserSideCardAttribute.name, `${user.firstname} ${user.lastname}`);
            userSideCard.setAttribute(UserSideCardAttribute.username, user.username);
            userSideCard.setAttribute(UserSideCardAttribute.profileimage, user.profileImage);
            userSideCard.setAttribute(UserSideCardAttribute.description, user.description);
            userSideCard.setAttribute(UserSideCardAttribute.userid, this.userid!);

            const sidebar = this.shadowRoot?.querySelector('.sidebar');
            sidebar?.appendChild(userSideCard);
        }
    }

    async renderFollowingUsers() {
        if (!this.userid) {
            console.error("No se encontró el UID del usuario actual.");
            return;
        }

        const followingUsers = await getFollowingUsers(this.userid);
        const usersContainer = this.shadowRoot?.querySelector("#friends-list");

        if (usersContainer) {
            usersContainer.innerHTML = "";

            followingUsers.forEach((user) => {
                const friendCard = this.ownerDocument.createElement('friend-card') as FriendCard;
                friendCard.setAttribute(FriendCardAttribute.username, user.firstname);
                friendCard.setAttribute(FriendCardAttribute.image, user.profileimage);
                friendCard.setAttribute(FriendCardAttribute.userid, user.id);
                usersContainer?.appendChild(friendCard);
            });
        }
    }

    async renderPosts() {
        if (!this.userid) return;

        const posts = await getPostByUser(this.userid);
        const postContainer = this.shadowRoot?.querySelector('#posts-container');
        if (postContainer) {
            postContainer.innerHTML = '';
            if (posts.length === 0) {
                const addPostMsg = this.ownerDocument.createElement('p');
                addPostMsg.innerHTML = 'Add any post';
                postContainer?.appendChild(addPostMsg);
            } else {
                posts.forEach((post: DashboardSectionItem) => {
                    const postCard = this.ownerDocument.createElement('my-card') as MyCard;
                    postCard.setAttribute(Attribute.image, post.image);
                    postCard.setAttribute(Attribute.description, post.description);
                    postCard.setAttribute(Attribute.likes, post.likes?.toString());
                    postCard.setAttribute(Attribute.postid, post.id);
                    postCard.setAttribute(Attribute.userid, appState.user);
                    postContainer?.appendChild(postCard);
                });
            }
        }
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
                        overflow: hidden;
                    }

                    .sidebar {
                        width: 250px;
                        padding: 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-right: 20px;
                        background-color: #3d3a0b;
                        flex-shrink: 0;
                    }

                    .main-content {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        padding: 20px;
                        overflow-y: auto;
                        height: calc(100vh - 40px);
                    }

                    .friends-section {
                        margin-bottom: 40px;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }

                    .add-button {
                        padding: 10px 20px;
                        background-color: #E2D54B;
                        color: #232106;
                        font-size: 0.9rem;
                        font-weight: bold;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                        align-self: flex-start;
                    }

                    .friends-title {
                        font-size: 1.2rem;
                        font-weight: bold;
                        color: #FCF3E4;
                        margin-top: 10px;
                        margin-bottom: 10px;
                        text-align: left;
                    }

                    .friends-container {
                        display: flex;
                        flex-wrap: nowrap;
                        gap: 10px;
                        overflow-x: auto;
                        align-items: center;
                    }

                    .feed-section {
                        margin-top: 20px;
                    }

                    .feed-title {
                        font-size: 1.2rem;
                        font-weight: bold;
                        color: #FCF3E4;
                        margin-bottom: 10px;
                    }

                    #posts-container {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 16px;
                    }

                    @media (max-width: 768px) {
                        #user-feed-container {
                            flex-direction: column;
                        }

                        .sidebar {
                            width: 100%;
                            margin-bottom: 20px;
                        }

                        .main-content {
                            height: auto;
                        }

                        .friends-container {
                            justify-content: flex-start;
                            overflow-x: scroll;
                        }

                        #posts-container {
                            flex-direction: column;
                            gap: 10px;
                        }
                    }
                </style>
                
                <div id="user-feed-container">
                    <div class="sidebar"></div>
                    <div class="main-content">
                        <div class="friends-section">
                            <button class="add-button" id="add-button">Add</button>
                            <div class="friends-title">Friends</div>
                            <div class="friends-container" id="friends-list">
                                <!-- Aquí se renderizan los amigos -->
                            </div>
                        </div>
                        <div class="feed-section">
                            <div class="feed-title">Feed</div>
                            <section id="posts-container">
                                <!-- Aquí se renderizan los posts -->
                            </section>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    bindEvents() {
        const addButton = this.shadowRoot?.querySelector("#add-button");
        addButton?.addEventListener("click", this.navigateToCreatePost.bind(this));
    }
}

customElements.define("user-feed-screen", UserFeedScreen);
export default UserFeedScreen;
