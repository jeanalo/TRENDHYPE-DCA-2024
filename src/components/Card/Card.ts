// src/components/myCard.ts

class MyCard extends HTMLElement {
    isFollowed: boolean;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isFollowed = false; // Inicializamos el estado de seguimiento a false
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    // Método para actualizar el contenido (imagen y descripción)
    updateContent(imgSrc: string, descriptionText: string) {
        const imgElement = this.shadowRoot?.querySelector('img');
        const descriptionElement = this.shadowRoot?.querySelector('p');
    
        if (imgElement) {
            imgElement.src = imgSrc;
            imgElement.alt = 'User image';
        }
    
        if (descriptionElement) {
            descriptionElement.textContent = descriptionText;
        }
    }
    
    // Método para alternar el estado de seguimiento y cambiar el texto del botón
    toggleFollow() {
        this.isFollowed = !this.isFollowed;
        const button = this.shadowRoot?.querySelector('.card-button');
        if (button) {
            button.innerHTML = `<span></span> ${this.isFollowed ? 'UnFollow' : 'Follow'}`;
        }
    }

    addEventListeners() {
        const likeIcon = this.shadowRoot?.querySelector<SVGElement>('#like-icon');
        const saveIcon = this.shadowRoot?.querySelector<SVGElement>('#save-icon');
        const followButton = this.shadowRoot?.querySelector('.card-button');

        if (followButton) {
            followButton.addEventListener('click', () => this.toggleFollow());
        }

        if (likeIcon) {
            likeIcon.addEventListener('click', () => {
                const likePath = likeIcon.querySelector('path');
                if (likePath) {
                    const currentColor = likePath.getAttribute('fill');
                    likePath.setAttribute('fill', currentColor === '#C01919' ? '#FCF3E4' : '#C01919');
                }
            });
        }

        if (saveIcon) {
            saveIcon.addEventListener('click', () => {
                const savePath = saveIcon.querySelector('path');
                if (savePath) {
                    const currentColor = savePath.getAttribute('fill');
                    savePath.setAttribute('fill', currentColor === '#E2D54B' ? '#FCF3E4' : '#E2D54B');
                }
            });
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/Card/card.css">
                <article class="card">
                    <div class="card-image-container">
                        <img src="" alt="User image" /> 
                        <button class="card-button">
                            <span></span> ${this.isFollowed ? 'UnFollow' : 'Follow'}
                        </button>
                    </div>
                    <div class="info">
                        <div class="icons-container">
                            <svg class="card-icons" id="like-icon" width="29" height="27" viewBox="0 0 29 27" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.7109 26.0425L12.6761 24.1902C5.449 17.6367 0.677734 13.3005 0.677734 8.00997C0.677734 3.67373 4.07375 0.291748 8.39596 0.291748C10.8377 0.291748 13.1813 1.42843 14.7109 3.21064C16.2405 1.42843 18.584 0.291748 21.0258 0.291748C25.348 0.291748 28.744 3.67373 28.744 8.00997C28.744 13.3005 23.9727 17.6367 16.7457 24.1902L14.7109 26.0425Z" fill="#FCF3E4"/>
                            </svg>

                            <svg class="card-icons" id="save-icon" width="17" height="31" viewBox="0 0 17 31" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 2.65496V30.5035L8.31948 22.5475L16.6377 30.5035V2.65496C16.6306 1.9486 16.3452 1.27354 15.8433 0.776425C15.3414 0.279312 14.6637 0.0002998 13.9573 0L13.8594 0.00127092H13.8645H2.77443L2.68165 0C1.97547 0.000296297 1.29791 0.279133 0.796074 0.775973C0.294237 1.27281 0.00863388 1.94755 0.00127093 2.65369L0 2.65496Z" fill="#FCF3E4"/>
                            </svg>
                        </div>
                        <p></p>
                    </div>
                </article>
            `;
        }
    }
}

customElements.define('my-card', MyCard);
export default MyCard;
