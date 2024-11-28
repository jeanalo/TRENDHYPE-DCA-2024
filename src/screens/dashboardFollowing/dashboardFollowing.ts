// src/screens/dashboardFollowing/dashboardFollowing.ts

import '../../components/Header/Header';
import '../../components/Aside/Aside';
import '../../components/TrendingUser/TrendingUser';
import '../../components/DashboardBanner/DashboardBanner';
import { appState } from '../../store';
import { getPostsFromFollowing, getUserByUID } from '../../utils/firebase';
import MyCard, { Attribute } from '../../components/Card/Card';
import Aside, { AsideAttribute } from '../../components/Aside/Aside';

class DashboardFollowing extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.getUserData()
    }

    async getUserData() {

        const userID = appState.user; // Obtener el UID del amigo desde el estado global

        if (!userID) {
            console.error('No se proporcionó el UID del amigo.');
            return;
        }

        const user = await getUserByUID(userID);

        if (user) {
            console.log(user);
            
            const aside = this.ownerDocument.createElement('aside-component') as Aside;
            aside.setAttribute(AsideAttribute.profileimage, user.profileImage);
            aside.setAttribute(AsideAttribute.name, `${user.firstname} ${user.lastname}`);
            aside.setAttribute(AsideAttribute.description, user.description);

            const mainContent = this.shadowRoot?.querySelector('.content');
            mainContent?.appendChild(aside);
            this.renderFollowingPosts()
            this.addSearchListener()
        }
        
    }

    async renderFollowingPosts(filteredPosts?: any[]) {
        if (!appState.user) {
            console.error("No se encontró el UID del usuario actual.");
            return;
        }

        const posts = filteredPosts || (await getPostsFromFollowing(appState.user));
        console.log("Posts de usuarios seguidos:", posts);

        const postContainer = this.shadowRoot?.querySelector(".user-feed");
        if (postContainer) {
            postContainer.innerHTML = "";

            if (posts.length === 0) {
                const noPostsMsg = this.ownerDocument.createElement("p");
                noPostsMsg.textContent = "No posts found.";
                postContainer.appendChild(noPostsMsg);
                return;
            }

            posts.forEach((post: { id: string; image?: string; description?: string; likes?: number; userID?: string }) => {
                const postCard = this.ownerDocument.createElement("my-card") as MyCard;
                if (post.image) postCard.setAttribute(Attribute.image, post.image);
                if (post.description) postCard.setAttribute(Attribute.description, post.description);
                if (post.likes !== undefined) postCard.setAttribute(Attribute.likes, post.likes.toString());
                postCard.setAttribute(Attribute.postid, post.id);
                if (post.userID) postCard.setAttribute(Attribute.userid, post.userID);
                postContainer.appendChild(postCard);
            });
        }
    }

    addSearchListener() {
        const aside = this.shadowRoot?.querySelector('aside-component');
        aside?.addEventListener('search', (event) => {
            const searchEvent = event as CustomEvent; // Declarar explícitamente como CustomEvent
            const searchTerm = searchEvent.detail.searchTerm.toLowerCase();
            
            getPostsFromFollowing(appState.user).then((posts: { id: string; description?: string }[]) => {
                const filteredPosts = posts.filter((post) => {
                    // Validamos que description esté definida antes de aplicar toLowerCase
                    return post.description && post.description.toLowerCase().includes(searchTerm);
                });
                this.renderFollowingPosts(filteredPosts);
            });
        });
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/screens/dashboardForYou/dashboardForYou.css">
                <div id="dashboardWrapper">
                    <header-component></header-component>
                    <div class="content">
                        <main>
                            <section class="user-feed">
                                <!-- Publicaciones se renderizarán aquí -->
                            </section>
                        </main>
                    </div>
                </div>
            `;
        }
    }
}

customElements.define('app-dashboardfollowing', DashboardFollowing);
export default DashboardFollowing;