import MyCard, { Attribute } from '../../components/Card/Card';
import UserSideCard, { UserSideCardAttribute } from '../../components/userSettings/userSideCard/userSideCard';
import { appState } from '../../store';
import { getSavedPosts, getUserByUID } from '../../utils/firebase';

class favoritePosts extends HTMLElement {
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
            this.renderSavedPosts();
        }
    }

    connectedCallback() {
        console.log('FavoritePosts component connected');
        this.render();
        this.getUserData();
    }

    async getUserData() {
        const userID = appState.user;

        if (!userID) {
            console.error('No se proporcionó el UID del usuario.');
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

    async renderSavedPosts() {
        if (!this.userid) {
            console.log('No userid passed');
            return;
        }

        const posts = await getSavedPosts(this.userid);
        const postContainer = this.shadowRoot?.querySelector('#posts-container');

        if (postContainer) {
            postContainer.innerHTML = "";
        }

        if (posts.length === 0) {
            const addPostMsg = this.ownerDocument.createElement('p');
            addPostMsg.innerHTML = 'Add to favorite any post';
            postContainer?.appendChild(addPostMsg);
        }

        posts.forEach((post: { id: string; image?: string; description?: string; likes?: number }) => {
            const postCard = this.ownerDocument.createElement('my-card') as MyCard;

            if (post.image) postCard.setAttribute(Attribute.image, post.image);
            if (post.description) postCard.setAttribute(Attribute.description, post.description);
            if (post.likes !== undefined) postCard.setAttribute(Attribute.likes, post.likes.toString());
            postCard.setAttribute(Attribute.postid, post.id);
            postCard.setAttribute(Attribute.userid, this.userid!);

            postContainer?.appendChild(postCard);
        });
    }

    render() {
        if (this.shadowRoot) {
            console.log('Rendering favoritePosts component...');
            this.shadowRoot.innerHTML = `
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: Arial, sans-serif;
                    }

                    #my-favorites-container {
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
                        background-color: #3d3a0b;
                        flex-shrink: 0;
                    }

                    .main-content {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        overflow-y: auto;
                        padding: 20px;
                    }

                    .banner {
                        width: 100%;
                        height: 200px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #FCF3E4;
                        font-size: 2.5rem;
                        font-weight: bold;
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
                    }

                    #posts-container {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 16px;
                        margin-top: 20px;
                    }

                    @media (max-width: 768px) {
                        #my-favorites-container {
                            flex-direction: column;
                        }

                        .sidebar {
                            width: 100%;
                            margin-bottom: 20px;
                        }

                        .main-content {
                            padding: 10px;
                        }

                        .banner {
                            height: 150px;
                            font-size: 2rem;
                        }

                        #posts-container {
                            gap: 10px;
                        }
                    }

                    @media (max-width: 480px) {
                        .banner {
                            height: 120px;
                            font-size: 1.8rem;
                        }

                        #posts-container {
                            flex-direction: column;
                            gap: 8px;
                        }
                    }
                </style>
                
                <div id="my-favorites-container">
                    <div class="sidebar"></div>
                    <div class="main-content">
                        <div class="banner">Favorites</div>
                        <section id="posts-container">
                            <!-- Aquí se renderizan los posts -->
                        </section>
                    </div>
                </div>
            `;
        } else {
            console.error('Shadow root not found');
        }
    }
}

customElements.define("my-favorites-screen", favoritePosts);

export default favoritePosts;
