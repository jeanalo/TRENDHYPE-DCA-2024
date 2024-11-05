import { addPosts } from '../../../utils/firebase'; 
import { navigate } from '../../../store/actions';
import { Screens } from '../../../types/store';
import { dispatch } from '../../../store/index';

const postInfo = {
    image: '',
    description: ''
};

export enum PostAttribute {
    title = 'title',
    image = 'image',
    description = 'description',
    submitButton = 'submitButton'
}

class AppPost extends HTMLElement {
    image?: string;
    description?: string;
    submitButton?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        console.log('Formulario de creación de post montado');
    }

    changeImage(e: Event) {
        const target = e.target as HTMLInputElement;
        postInfo.image = target.value;
    }

    changeDescription(e: Event) {
        const target = e.target as HTMLTextAreaElement;
        postInfo.description = target.value;
    }

    async submitForm(e: Event) {
        e.preventDefault();
        
        if (!postInfo.image || !postInfo.description) {
            alert("Por favor, completa todos los campos antes de enviar.");
            return;
        }

        await addPosts(postInfo); 
        console.log('Navegando a USERFEED después de crear la publicación');
        dispatch(navigate(Screens.USERPROFILE));
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    .form-container {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        width: 100vw;
                        max-width: 50%;
                        margin: 40px ;
                        color: #FCF3E4;
                    }

                    .form-title {
                        font-size: 2em;
                        font-weight: bold;
                        color: #FCF3E4;
                        margin-bottom: 10px;
                        text-align: left;
                    }

                    .form-subtitle {
                        font-size: 0.8em;
                        font-weight: ligth;
                        color: #FCF3E4;
                        margin-bottom: 30px;
                        text-align: left;
                        width: 400px;
                    }

                    label {
                        font-size: 1em;
                        font-weight: bold;
                        color: #FCF3E4;
                        margin-bottom: 4px;
                    }

                    form {
                        display: flex;
                        flex-direction: column;
                        gap: 20px;
                        width: 100%;
                    }

                    input[type="text"],
                    textarea {
                        padding: 15px;
                        font-size: 1em;
                        border: none;
                        border-radius: 15px;
                        background-color: #46410B;
                        color: #f5f5dc;
                        outline: none;
                        width: 400px;

                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 10px rgba(255, 255, 255, 0.1) inset;
                    }

                    input[type="text"]::placeholder,
                    textarea::placeholder {
                        color: #232106;
                    }

                    textarea {
                        resize: none;
                        height: 90px;
                        width: 100%;
                        width: 400px;
                    }

                    .form-button {
                        padding: 5px;
                        font-size: 0.8em;
                        background-color: #E2D54B;
                        border: none;
                        border-radius: 15px;
                        color: #f5f5dc; 
                        cursor: pointer;
                        font-weight: bold;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 15px rgba(226, 213, 75, 0.6);
                        transition: background-color 0.3s ease, box-shadow 0.3s ease;
                        width: 100px;
                        text-align: center;
                    }

                    .form-button:hover {
                        background-color: #AFA53A;
                        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3), 0 0 20px rgba(226, 213, 75, 0.8);
                    }
                </style>

                <div class="form-container">
                    <h1 class="form-title">New Post</h1>
                    <p class="form-subtitle">Share your unique style with the world! Upload photos, add descriptions and tag trends - your fashion, your story!</p>
                    <form id="post-form">
                        <label for="image">Image</label>
                        <input id="image" placeholder="Upload file" type="text" value="${this.image || ''}"/>
                        
                        <label for="description">Description</label>
                        <textarea id="description" placeholder="You need more words to say what you think, or show what you did, no problem, write to do everything you think." rows="4"></textarea>
                        
                        <button type="submit" class="form-button">Publish</button>
                    </form>
                </div>
            `;

            this.shadowRoot.getElementById("image")?.addEventListener("change", this.changeImage.bind(this));
            this.shadowRoot.getElementById("description")?.addEventListener("change", this.changeDescription.bind(this));
            this.shadowRoot.getElementById("post-form")?.addEventListener("submit", this.submitForm.bind(this));
        }
    }
}

customElements.define('app-post', AppPost);
export default AppPost;
