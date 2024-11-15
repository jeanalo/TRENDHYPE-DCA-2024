// post-card.ts
export enum PostCardAttribute {
    image = 'image',
    description = 'description',
}

class PostCard extends HTMLElement {
    image?: string;   
    description?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return [PostCardAttribute.image, PostCardAttribute.description];
    }

    attributeChangedCallback(propName: PostCardAttribute, oldValue: string | undefined, newValue: string | undefined) {
        this[propName] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    .post-card {
                        border: none;
                        padding: 0;
                        margin: 8px;
                        border-radius: 16px;
                        overflow: hidden;
                        width: 250px;
                        height: 350px;
                        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                        font-family: Arial, sans-serif;
                        background-color: #FFF8F2;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: space-between;
                    }
                    .post-card img {
                        width: 100%;
                        height: 80%;
                        object-fit: cover;
                        border-radius: 16px 16px 0 0;
                    }
                    .post-card p {
                        font-size: 12px;
                        font-weight: light;
                        color: #d48872;
                        margin: 0;
                        padding: 10px;
                        background-color: #F8F1E8;
                        width: 100%;
                        height: 20%;
                        text-align: center;
                    }
                </style>
                <section class="post-card">
                    <img src="${this.image || ''}" alt="post image">
                    <p>${this.description || 'No description available'}</p>
                </section>
            `;
        }
    }
}

customElements.define('post-card', PostCard);
export default PostCard;