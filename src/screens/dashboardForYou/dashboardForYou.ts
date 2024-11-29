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
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }

                #dashboardWrapper {
                    background-color: #232106;
                    height: 100vh; /* Mantiene la altura completa en pantallas grandes */
                    overflow: hidden; /* Evita que el contenedor principal haga scroll */
                }

                .content {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                }

                main {
                    padding: 40px 40px 60px 60px;
                    flex: 1;
                    overflow-y: auto; /* Permite scroll solo en main */
                    height: calc(100vh - 78px); /* Altura ajustada para la pantalla completa menos el header */
                }

                .trending-users-banner {
                    margin: 22px 0;
                    border-radius: 20px;
                    background-color: #E2D34B;
                }

                .trending-users-banner h2 {
                    padding: 20px 0;
                    color: #9A5311;
                }

                .trending-users-contianer {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 30px;
                }

                .user-feed {
                    margin-top: 22px;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 30px;
                }

                /* Ajustes solo para pantallas menores a 768px */
                @media screen and (max-width: 768px) {
                    #dashboardWrapper {
                        height: 100vh; /* Usa el 100% de la altura de la pantalla */
                        overflow: hidden; /* Evita el scroll en el contenedor principal */
                    }

                    main {
                        padding: 20px;
                        width: 100%;
                        height: calc(100vh - 78px); /* Altura ajustada para la pantalla completa menos el header */
                        overflow-y:auto /* Permite scroll solo en main en pantallas pequeñas */
                    }

                    .trending-users-contianer,
                    .user-feed {
                        grid-template-columns: 1fr; /* Cambia a una sola columna en pantallas pequeñas */
                        gap: 15px;
                    }

                    aside {
                        overflow: hidden; /* Asegura que el aside no tenga scroll */
                        height: auto; /* Ajusta la altura del aside automáticamente */
                    }
                }

        
             </style>
            `;

        }
    }
}

customElements.define('app-dashboardforyou', Dashboard);
export default Dashboard;
