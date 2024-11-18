import { addPosts, uploadPostImage, getPostImage } from '../../../utils/firebase';
import { navigate } from '../../../store/actions';
import { Screens } from '../../../types/store';
import { dispatch, appState } from '../../../store/index'; // Importamos appState para acceder al userID

const postInfo = {
    image: '',
    description: '',
    userID: '' // Agregamos el userID para almacenarlo en Firestore
};

export enum PostAttribute {
    title = 'title',
    image = 'image',
    description = 'description',
    submitButton = 'submitButton'
}

class AppPost extends HTMLElement {
    imageFile?: File;
    description?: string;

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
        this.imageFile = target.files ? target.files[0] : undefined;
        console.log('Archivo de imagen seleccionado:', this.imageFile);
    }

    changeDescription(e: Event) {
        const target = e.target as HTMLTextAreaElement;
        postInfo.description = target.value;
        console.log('Descripción actualizada:', postInfo.description);
    }

    async submitForm(e: Event) {
        e.preventDefault();

        if (!this.imageFile || !postInfo.description) {
            alert("Por favor, completa todos los campos antes de enviar.");
            return;
        }

        try {
            // Obtiene el userID desde el estado global
            const userID = appState.user;
            if (!userID) {
                throw new Error("El userID no está disponible. Asegúrate de que el usuario esté autenticado.");
            }

            // Agrega el userID al objeto postInfo
            postInfo.userID = userID;

            console.log('Iniciando subida de imagen...');
            const uniqueFileName = `posts/${userID}_${Date.now()}_${this.imageFile.name}`;
            await uploadPostImage(this.imageFile, uniqueFileName);
            const imageUrl = await getPostImage(uniqueFileName);

            if (imageUrl) {
                postInfo.image = imageUrl;
            } else {
                throw new Error("No se pudo obtener la URL de la imagen.");
            }

            // Añade el post a Firestore incluyendo el userID
            await addPosts(postInfo);
            alert('Post creado exitosamente');

            // Redirige al perfil de usuario
            console.log("Redirigiendo a USERPROFILE...");
            dispatch(navigate(Screens.USERPROFILE));
        } catch (error) {
            console.error("Error al crear el post:", error);
            alert("Hubo un error al crear el post. Por favor, inténtalo de nuevo.");
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

                    .form-container {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        width: 100%;
                        max-width: 600px;
                        margin: 40px;
                        color: #FCF3E4;
                        background-color: #333;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    }

                    .form-title {
                        font-size: 2em;
                        font-weight: bold;
                        color: #FCF3E4;
                        margin-bottom: 10px;
                        text-align: left;
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

                    input[type="file"],
                    textarea {
                        padding: 15px;
                        font-size: 1em;
                        border: none;
                        border-radius: 15px;
                        background-color: #46410B;
                        color: #f5f5dc;
                        outline: none;
                        width: 100%;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 0 10px rgba(255, 255, 255, 0.1) inset;
                    }

                    input[type="file"]::placeholder,
                    textarea::placeholder {
                        color: #232106;
                    }

                    textarea {
                        resize: none;
                        height: 90px;
                    }

                    .form-button {
                        padding: 10px;
                        font-size: 1em;
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

                    /* Responsive styling for smaller screens */
                    @media (max-width: 768px) {
                        .form-container {
                            width: 100%;
                            padding: 10px;
                            margin: 0;
                        }

                        .form-title {
                            font-size: 1.5em;
                        }

                        input[type="file"],
                        textarea {
                            font-size: 0.9em;
                        }

                        .form-button {
                            width: 100%;
                            padding: 10px;
                        }
                    }
                </style>

                <div class="form-container">
                    <h1 class="form-title">New Post</h1>
                    <form id="post-form">
                        <label for="image">Image</label>
                        <input id="image" type="file" />

                        <label for="description">Description</label>
                        <textarea id="description" placeholder="Write your thoughts..."></textarea>
                        
                        <button type="submit" class="form-button">Publish</button>
                    </form>
                </div>
            `;

            // Conectar eventos
            const imageInput = this.shadowRoot.getElementById("image");
            const descriptionInput = this.shadowRoot.getElementById("description");
            const form = this.shadowRoot.getElementById("post-form");

            imageInput?.addEventListener("change", this.changeImage.bind(this));
            descriptionInput?.addEventListener("change", this.changeDescription.bind(this));
            form?.addEventListener("submit", this.submitForm.bind(this));
        }
    }
}

customElements.define('app-post', AppPost);
export default AppPost;