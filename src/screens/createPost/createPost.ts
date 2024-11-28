import { addPosts } from '../../utils/firebase';
import { getPublications, navigate } from '../../store/actions';
import { Screens } from '../../types/store';
import { dispatch } from '../../store/index';
import AppPost, { PostAttribute } from '../../components/Post/post-form/post-form';

class CreatePostScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }


    async handleCreatePost(postData: { title: string; image: string; description: string;}) {
        try {
            // Agregar la publicación a Firebase
            await addPosts(postData);

            // Actualizar las publicaciones en appState para reflejar la nueva lista
            dispatch(await getPublications()); // Despachar la acción para actualizar el estado global

            // Redirigir a la pantalla de User Feed después de crear la publicación
            dispatch(navigate(Screens.USERPROFILE));
        } catch (error) {
            console.error("Error al crear la publicación:", error);
        }
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

                    #create-post-container {
                        display: flex;
                        width: 100vw;
                        height: 100vh;
                        background-color: #232106;
                        color: #FCF3E4;
                    }

                    .image-container {
                        flex: 0 0 40%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .image-container img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .form-container {
                        flex: 0 0 60%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        padding: 5px;
                    }

                    @media (max-width: 768px) {
                        #create-post-container {
                            flex-direction: column;
                            height: auto;
                        }
                    }
                </style>
                <img id="logo" src="https://github.com/jeanalo/IMG-assets/blob/main/TrendHypeLOGO.png?raw=true" alt="alt='TrendHypeLogo'"/>
                <div id="create-post-container">
                    <div class="image-container">
                        <img src="https://i.pinimg.com/736x/06/6d/58/066d58da1ab80679e5cfe40da7f514a6.jpg" alt="Post Image">
                    </div>
                    <div class="form-container">
                    </div>
                </div>
            `;

            // Logo click para volver al dashboard
            const logo = this.shadowRoot.querySelector('#logo');

            logo?.addEventListener('click', () => {
                dispatch(navigate(Screens.DASHBOARD))
            })

            const appPostComponent = new AppPost();
            appPostComponent.setAttribute(PostAttribute.title, 'New Post');
            appPostComponent.setAttribute(PostAttribute.image, ''); ``
            appPostComponent.setAttribute(PostAttribute.description, '');
            appPostComponent.setAttribute(PostAttribute.submitButton, 'Publish');

            // Añadir el componente del formulario
            this.shadowRoot.querySelector('.form-container')?.appendChild(appPostComponent);

            // Configurar el evento de publicación
            appPostComponent.addEventListener('submitPost', (event: any) => {
                const { title, image, description } = event.detail;
                this.handleCreatePost({ title, image, description });
            });
        }
    }
}

customElements.define('create-post-screen', CreatePostScreen);
export default CreatePostScreen;