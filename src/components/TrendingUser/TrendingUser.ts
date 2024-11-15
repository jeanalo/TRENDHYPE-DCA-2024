class TrendingUser extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const name = this.getAttribute('name') || 'Name';
        const age = this.getAttribute('age') || 30;
        const desc = this.getAttribute('desc') || 'Description of user'
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../src/components/TrendingUser/trendingUser.css">
                <article class="trending-user">
                    <div class="user-info">
                    <p>${name}</p>
                    <span></span>
                    <p>${age} YEARS OLD</p>
                    </div>
                    <p class="user-desc">
                     "${desc}"
                    </p>
                </article>
            `;
        }
    }
}

customElements.define('trending-user', TrendingUser);
export default TrendingUser;