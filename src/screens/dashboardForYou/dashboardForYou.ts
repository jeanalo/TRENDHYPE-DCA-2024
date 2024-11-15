import { getDashboardSections } from '../../utils/firebase'; // Asegúrate de la ruta correcta
import { DashboardSectionItem } from '../../types/dashboardforyoutypes'; // Importa el tipo

class Dashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        await this.render();
        console.log('Dashboard screen loaded');
    }

    async render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/screens/dashboardForYou/dashboardForYou.css">
                <div id="dashboardWrapper">
                    <header-component></header-component>
                    <div class="content">
                        <main>
                            <dashboard-banner></dashboard-banner>
                            <section class="trending-users-banner">
                                <h2>TRENDING USERS</h2>
                            </section>
                            <section class="trending-users-contianer">
                    <trending-user name="LAURA" age="30"
                        desc="I'm Laura, a fashion lover with an eye for urban and chic. My style is inspired by streetwear and contemporary trends. This season, I'm exploring layering and fabric mixing to create outfits that are both functional and stylish."></trending-user>
                    <trending-user name="MARIETA" age="30"
                        desc="Hi, I'm Marieta, a fashion enthusiast with a bold edge. This season, I'm all about vibrant colors and leather pieces that elevate any outfit. I love mixing classic with modern."></trending-user>
                    <trending-user name="DANIEL" age="30"
                        desc="I'm Daniel, a fashion lover with an eye for urban and chic. My style is inspired by streetwear and contemporary trends. This season, I'm exploring layering and fabric mixing to create outfits that are both functional and stylish."></trending-user>
                </section>
                            <section class="user-feed">
                                
                                <my-card></my-card>
                                <my-card></my-card>
                                <my-card></my-card>
                                <my-card></my-card>
                                <my-card></my-card>
                                <my-card></my-card>
                            </section>
                        </main>
                        <aside-component></aside-component>
                    </div>
                </div>
            `;

            const data: DashboardSectionItem[] = await getDashboardSections();
            const cards = this.shadowRoot.querySelectorAll('section.user-feed my-card');

            data.slice(0, cards.length).forEach((item, index) => {
                const card = cards[index] as any;
                if (card && typeof card.updateContent === 'function') {
                    card.updateContent(item.img, item.description);
                }
            });
        }
    }
}

customElements.define('app-dashboardforyou', Dashboard);
export default Dashboard;
