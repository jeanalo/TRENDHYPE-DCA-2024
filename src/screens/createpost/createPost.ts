import { addPosts } from '../../utils/firebase'; 
import { navigate } from '../../store/actions';
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

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    *, *::before, *::after {
                        box-sizing: border-box;
                    }

                    html, body {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }

                    #create-post-container {
                        display: flex;
                        width: 100vw;
                        height: 100vh;
                        background-color: #232106;
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

                    /* Ajustes responsivos para dispositivos móviles */
                    @media (max-width: 768px) {
                        #create-post-container {
                            flex-direction: column;
                            align-items: center;
                            height: auto;
                            padding: 10px;
                        }

                        .image-container {
                            flex: 0 0 auto;
                            width: 100%;
                            max-height: 50vh;
                        }

                        .image-container img {
                            height: auto;
                        }

                        .form-container {
                            flex: 0 0 auto;
                            width: 100%;
                            padding: 20px;
                        }
                    }
                </style>

                <div id="create-post-container">
                    <div class="image-container">
                        <img src="https://i.pinimg.com/736x/06/6d/58/066d58da1ab80679e5cfe40da7f514a6.jpg" alt="Post Image">
                    </div>
                    <div class="form-container">
                    </div>
                </div>
            `;

            const appPostComponent = new AppPost();
            appPostComponent.setAttribute(PostAttribute.title, 'New Post');
            appPostComponent.setAttribute(PostAttribute.image, '');
            appPostComponent.setAttribute(PostAttribute.description, '');
            appPostComponent.setAttribute(PostAttribute.submitButton, 'Publish');

            this.shadowRoot.querySelector('.form-container')?.appendChild(appPostComponent);
        }
    }
}

customElements.define('create-post-screen', CreatePostScreen);
export default CreatePostScreen;
