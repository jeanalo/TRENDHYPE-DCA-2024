import { appState } from "../../store/index";
import UserSideCard, { UserSideCardAttribute } from "../../components/userSettings/userSideCard/userSideCard";
import { getPostByUser, getUserByUID } from "../../utils/firebase";
import { DashboardSectionItem } from "../../types/dashboardforyoutypes";
import MyCard, { Attribute } from "../../components/Card/Card";


class FriendFeedScreen extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    connectedCallback() {
        this.render();
        this.fetchFriendData();
        this.renderPosts();
    }

    async fetchFriendData() {
        const userID = appState.friend; // Obtener el UID del amigo desde el estado global

        if (!userID) {
            console.error('No se proporcionó el UID del amigo.');
            return;
        }

        const friendData = await getUserByUID(userID); // Obtener información del usuario desde Firebase

        if (friendData) {
            console.log("Friend data:", friendData, friendData.userID); // Pintar la información en consola            
            
            const userSideCard = new UserSideCard();
            userSideCard.setAttribute(UserSideCardAttribute.name, `${friendData.firstname} ${friendData.lastname}`);
            userSideCard.setAttribute(UserSideCardAttribute.username, friendData.username);
            userSideCard.setAttribute(UserSideCardAttribute.profileimage, friendData.profileImage );
            userSideCard.setAttribute(UserSideCardAttribute.description, friendData.description);
            userSideCard.setAttribute(UserSideCardAttribute.userid, friendData.userID)
    
            const sidebar = this.shadowRoot?.querySelector('.sidebar');
            sidebar?.appendChild(userSideCard);
        } else {
            console.warn("No data for that ID.");
        }
    }

    async renderPosts() {
        const userID = appState.friend

        if (!userID) {
            console.log('No userid passed');
            return
        }

        const posts = await getPostByUser(userID);
        const postContainer = this.shadowRoot?.querySelector('#posts-container')

        if (postContainer) {
            postContainer.innerHTML = '';
        }

        if (posts.length === 0) {
            const addPostMsg = this.ownerDocument.createElement('p')
            addPostMsg.innerHTML = 'No posts'
            postContainer?.appendChild(addPostMsg);
        }

        posts.forEach((post: DashboardSectionItem) => {
            const postCard = this.ownerDocument.createElement('my-card') as MyCard;
            postCard.setAttribute(Attribute.image, post.image);
            postCard.setAttribute(Attribute.description, post.description);
            postCard.setAttribute(Attribute.likes, post.likes?.toString());
            postCard.setAttribute(Attribute.postid, post.id);
            postCard.setAttribute(Attribute.userid, post.userID)
            postContainer?.appendChild(postCard);
        })

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
                        font-size: 1rem;
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
                        font-size: 1rem;
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
                    <div class="sidebar"></div>
                    <div class="main-content">
                        <div class="feed-title">Feed</div>
                        <section id="posts-container">
                        
                        </section>
                    </div>
                </div>
            `;
        }
    }

}

customElements.define("friend-feed-screen", FriendFeedScreen);
export default FriendFeedScreen;