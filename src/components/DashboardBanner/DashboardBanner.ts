import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

class DashboardBanner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners(); // Agregar eventos después de renderizar
    }

    // Método para agregar eventos de clic
    addEventListeners() {
        const answerLink = this.shadowRoot?.querySelector('a');
        
        // Navegar a la pantalla de "Question of the Day" al hacer clic en el enlace
        answerLink?.addEventListener('click', () => this.navigateToQuestionOfTheDay());
    }

    // Método para navegar a la pantalla de "Question of the Day"
    navigateToQuestionOfTheDay() {
        dispatch(navigate(Screens.QUESTIONOFTHEDAY)); // Navegar a QUESTIONOFTHEDAY
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/DashboardBanner/DashboardBanner.css">
                <section class="dashboard-banner">
                    <div class="info-banner-container">
                        <p id="daily-tracker">Daily tracker</p>
                        <p id="answer-daily-question">Answer daily question</p>
                        <h2>Find out today's<br>mood</h2>
                        <a>Answer now</a> <!-- Enlace que redirige al hacer clic -->
                        <div>
                            <img src="https://github.com/jeanalo/IMG-assets/blob/main/MainBannerCompossed.png?raw=true" alt="Profile" />
                        </div>
                    </div>
                </section>
            `;
        }
    }
}

customElements.define('dashboard-banner', DashboardBanner);
export default DashboardBanner;
