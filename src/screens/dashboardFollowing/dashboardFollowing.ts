// src/screens/dashboardFollowing/dashboardFollowing.ts

import '../../components/Header/Header';
import '../../components/Aside/Aside';
import '../../components/TrendingUser/TrendingUser';
import '../../components/DashboardBanner/DashboardBanner';
import '../../components/Card/Card';
import { fetchPostsAction, navigate } from "../../store/actions";
import { dispatch, appState } from "../../store/index";
import { Screens } from "../../types/store";
import MyCard from '../../components/Card/Card';

interface Post {
    image: string;
    description: string;
}

class DashboardFollowing extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        this.render();
        await this.loadPosts();
    }

    async loadPosts() {
        const postsAction = await fetchPostsAction();
        dispatch(postsAction);
        console.log('Publicaciones en el estado global:', appState.publications); // Verifica que las publicaciones se hayan cargado
        this.renderPosts();
    }

    renderPosts() {
        const postContainer = this.shadowRoot?.querySelector(".user-feed");
        if (!postContainer) {
            console.warn("postContainer not found in the DOM.");
            return;
        }

        postContainer.innerHTML = ''; // Limpia cualquier contenido previo

        if (!appState.publications || appState.publications.length === 0) {
            postContainer.innerHTML = '<p>No hay publicaciones disponibles.</p>';
            return;
        }

        appState.publications.forEach((post: Post) => {
            const cardElement = new MyCard();
            console.log('Actualizando tarjeta con:', post); // Verifica los datos pasados a updateContent
            cardElement.updateContent(post.image, post.description); // Actualiza la tarjeta con los datos

            if (cardElement.shadowRoot) {
                const img = cardElement.shadowRoot.querySelector('img');
                const desc = cardElement.shadowRoot.querySelector('p');
                console.log('Imagen:', img?.src, 'Descripción:', desc?.textContent); // Asegúrate de que los elementos se están actualizando
            }

            postContainer.appendChild(cardElement);
        });
    }

    render() {
        if (this.shadowRoot) {
            // Renderizado básico de DashboardFollowing
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
                        <aside-component></aside-component>
                    </div>
                </div>
            `;
        }
    }
}

customElements.define('app-dashboardfollowing', DashboardFollowing);
export default DashboardFollowing;
