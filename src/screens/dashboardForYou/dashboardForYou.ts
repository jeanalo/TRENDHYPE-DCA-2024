import { DashboardSectionItem } from '../../types/dashboardforyoutypes'; // Importa el tipo
import { appState, dispatch } from '../../store';
import MyCard, { Attribute } from '../../components/Card/Card';
import { getPublications } from '../../store/actions';
import Aside, { AsideAttribute } from '../../components/Aside/Aside';
import { getUserByUID } from '../../utils/firebase';

class Dashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        this.render();
        this.getUserData();

        if (appState.publications.length === 0) {
            const posts = await getPublications();
            dispatch(posts);
            this.renderPosts(appState.publications);
        } else {
            this.renderPosts(appState.publications);
        }
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

            this.addSearchListener();

        }

    }

    addSearchListener() {
        const aside = this.shadowRoot?.querySelector('aside-component');
        aside?.addEventListener('search', (event) => {
            const searchEvent = event as CustomEvent; // Declarar explícitamente como CustomEvent
            const searchTerm = searchEvent.detail.searchTerm;
            const filteredPosts = appState.publications.filter((post: { description: string }) =>
                post.description.toLowerCase().includes(searchTerm)
            );
            this.renderPosts(filteredPosts);
        });
    }

    renderPosts(posts: DashboardSectionItem[]) {
        const postsContainer = this.shadowRoot?.querySelector('.user-feed');
        if (postsContainer) {
            postsContainer.innerHTML = ""; // Limpiar publicaciones actuales

            if (posts.length === 0) {
                // Mostrar mensaje si no hay posts
                const noPostsMessage = this.ownerDocument.createElement('p');
                noPostsMessage.textContent = "No posts found";
                noPostsMessage.style.textAlign = "center";
                noPostsMessage.style.color = "#BCB3AA";
                postsContainer.appendChild(noPostsMessage);
                return;
            }

            // Renderizar posts si existen
            posts.forEach((publication) => {
                const card = this.ownerDocument.createElement('my-card') as MyCard;
                card.setAttribute(Attribute.image, publication.image);
                card.setAttribute(Attribute.description, publication.description);
                card.setAttribute(Attribute.likes, publication.likes?.toString());
                card.setAttribute(Attribute.postid, publication.id);
                card.setAttribute(Attribute.userid, publication.userID);
                postsContainer.appendChild(card);
            });
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/screens/dashboardForYou/dashboardForYou.css">
                <div id="dashboardWrapper">
                    <header-component></header-component>
                    <div class="content">
                        <main>
                            <dashboard-banner></dashboard-banner>
                            <section class="trending-users-banner">
                                <h2>TRENDING USERS</h2>
                            </section>
                            <section class="user-feed"></section>
                        </main>
                        
                    </div>
                </div>
            `;

        }
    }
}

customElements.define('app-dashboardforyou', Dashboard);
export default Dashboard;
