class bannerFavorites extends HTMLElement {
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
                    .favorites-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 100%;
                        background-color: #232106;
                        color: #FCF3E4;
                    }

                    /* Banner en la parte superior */
                    .banner-container {
                        width: 100%;
                        height: 250px;
                        position: relative;
                        overflow: hidden;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .background-image {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-image: url('https://i.pinimg.com/564x/7e/e7/fc/7ee7fcc676d400db263d6af9ebb183c2.jpg');
                        background-size: cover;
                        background-position: center;
                        filter: brightness(0.5);
                    }

                    .glass-effect {
                        position: relative;
                        padding: 20px 40px;
                        background: rgba(255, 255, 255, 0.2);
                        backdrop-filter: blur(10px);
                        border-radius: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .title {
                        font-size: 2.5rem;
                        font-weight: bold;
                        color: white;
                        text-align: center;
                        text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
                    }

                    .favorites-content {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 20px;
                        justify-content: center;
                        padding-top: 20px;
                        padding-left: 10px;
                        padding-right: 10px;
                        width: 100%;
                    }
                </style>

                <div class="favorites-container">
                    <!-- Banner con la imagen de fondo y efecto de vidrio -->
                    <div class="banner-container">
                        <div class="background-image"></div>
                        <div class="glass-effect">
                            <div class="title">My favorites</div>
                        </div>
                    </div>

                    <!-- Contenedor de las publicaciones favoritas -->
                    <div class="favorites-content">
                        <!-- Aquí irán las cards de tus publicaciones favoritas -->
                    </div>
                </div>
            `;
        }
    }
}

// Solo define el componente si aún no está registrado
if (!customElements.get('my-favorites-screen')) {
    customElements.define('my-favorites-screen', bannerFavorites);
}

export default bannerFavorites;
