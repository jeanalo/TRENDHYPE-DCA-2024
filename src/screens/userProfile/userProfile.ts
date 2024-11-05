import { navigate, fetchPostsAction } from "../../store/actions";
import { dispatch, appState } from "../../store/index";
import { Screens } from "../../types/store";
import PostCard, { PostCardAttribute } from '../../components/Post/post-card/post-card';

class UserFeedScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        this.render();
        await this.loadPosts();
    }

    async loadPosts() {
        if (appState.publications.length > 0) {
            console.log("Publicaciones ya cargadas en el estado global.");
            this.renderPosts();
            return;
        }

        const postsAction = await fetchPostsAction();
        dispatch(postsAction);
        this.renderPosts();
    }

    disconnectedCallback() {
        console.log("UserFeedScreen desmontado.");
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

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    #posts-container {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 16px;
                        padding: 16px;
                    }

                    #back-button {
                        background-color: #d48872;
                        color: white;
                        padding: 8px 16px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        margin-bottom: 16px;
                    }

                    #back-button:hover {
                        background-color: #b3745e;
                    }
                </style>
                
                <button id="back-button">Back to Create Post</button>
                <section id="posts-container"></section>
            `;

            const backButton = this.shadowRoot.querySelector("#back-button");
            backButton?.addEventListener("click", () => {
                console.log("Botón de Back presionado");
                dispatch(navigate(Screens.CREATEPOST));
            });
        }
    }
}

customElements.define("user-feed-screen", UserFeedScreen);
export default UserFeedScreen;
