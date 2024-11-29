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

    async handleCreatePost(postData: { title: string; image: string; description: string; }) {
        try {
            // Add the post to Firebase
            await addPosts(postData);

            // Update appState to reflect the new list
            dispatch(await getPublications());

            // Redirect to the user profile screen
            dispatch(navigate(Screens.USERPROFILE));
        } catch (error) {
            console.error("Error creating post:", error);
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
                        flex-direction: row;
                        width: 100vw;
                        height: 100vh;
                        background-color: #232106;
                        color: #FCF3E4;
                    }

                    .image-container {
                        flex: 1;
                        max-width: 40%;
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
                        flex: 1;
                        max-width: 60%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 20px;
                        border-radius: 10px;
                    }

                    @media (max-width: 768px) {
                        #create-post-container {
                            flex-direction: column;
                        }

                        .image-container {
                            max-width: 100%;
                            height: 200px;
                        }

                        .image-container img {
                            width: 100%;
                            height: 100%;
                        }

                        .form-container {
                            max-width: 100%;
                            padding: 10px;
                        }
                    }

                    @media (max-width: 480px) {
                        .form-container {
                            padding: 5px;
                        }

                        .image-container {
                            height: 150px;
                        }
                    }
                </style>

                <img id="logo" src="https://github.com/jeanalo/IMG-assets/blob/main/TrendHypeLOGO.png?raw=true" alt="TrendHypeLogo" />
                <div id="create-post-container">
                    <div class="image-container">
                        <img src="https://i.pinimg.com/736x/06/6d/58/066d58da1ab80679e5cfe40da7f514a6.jpg" alt="Post Image">
                    </div>
                    <div class="form-container">
                    </div>
                </div>
            `;

            // Add event listener for logo to navigate to dashboard
            const logo = this.shadowRoot.querySelector('#logo');
            logo?.addEventListener('click', () => {
                dispatch(navigate(Screens.DASHBOARD));
            });

            // Add the AppPost form component
            const appPostComponent = new AppPost();
            appPostComponent.setAttribute(PostAttribute.title, 'New Post');
            appPostComponent.setAttribute(PostAttribute.image, '');
            appPostComponent.setAttribute(PostAttribute.description, '');
            appPostComponent.setAttribute(PostAttribute.submitButton, 'Publish');

            this.shadowRoot.querySelector('.form-container')?.appendChild(appPostComponent);

            // Set up the submit event listener
            appPostComponent.addEventListener('submitPost', (event: any) => {
                const { title, image, description } = event.detail;
                this.handleCreatePost({ title, image, description });
            });
        }
    }
}

customElements.define('create-post-screen', CreatePostScreen);
export default CreatePostScreen;
