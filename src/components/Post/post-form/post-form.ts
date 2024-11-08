import { addPosts, uploadPostImage, getPostImage } from '../../../utils/firebase';
import { navigate } from '../../../store/actions';
import { Screens } from '../../../types/store';
import { dispatch } from '../../../store/index';

const postInfo = {
    image: '',
    description: '',
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
            console.log('Iniciando subida de imagen...');
            const uniqueFileName = await uploadPostImage(this.imageFile, `posts/${Date.now()}_${this.imageFile.name}`);
            const imageUrl = await getPostImage(uniqueFileName);

            if (imageUrl) {
                postInfo.image = imageUrl;
            } else {
                throw new Error("No se pudo obtener la URL de la imagen.");
            }

            // Añade el post a Firestore
            
            await addPosts(postInfo);
            alert('Post creado exitosamente');

            // Redirige al perfil de usuario
            console.log("Redirigiendo a USERPROFILE..."); // Depuración
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
                    /* Aquí van los estilos */
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
