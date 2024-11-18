export enum ProfileImageAttribute {
    src = 'src', // URL de la imagen
    alt = 'alt', // Texto alternativo
}

class ProfileImage extends HTMLElement {
    src?: string;
    alt?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(ProfileImageAttribute);
    }

    attributeChangedCallback(name: ProfileImageAttribute, oldValue: string | null, newValue: string | null) {
        (this as any)[name] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    .profile-image {
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        object-fit: cover;
                        cursor: pointer;
                    }
                </style>
                <img 
                    class="profile-image" 
                    src="${this.src || 'https://i.pinimg.com/564x/ec/0f/a7/ec0fa7e18612c6a5239742cfd9dd6c46.jpg'}" 
                    alt="${this.alt || 'User Profile Image'}"
                />
            `;
        }
    }
}

customElements.define('profile-image', ProfileImage);
export default ProfileImage;
