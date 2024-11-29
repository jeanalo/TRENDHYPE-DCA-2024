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
                <section class="dashboard-banner">
                    <div class="info-banner-container">
                        <p id="daily-tracker">Daily tracker</p>
                        <p id="answer-daily-question">Answer daily question</p>
                        <h2>Find out today's<br>mood</h2>
                        <a>Answer now</a> 
                        <div>
                            <img src="https://github.com/jeanalo/IMG-assets/blob/main/MainBannerCompossed.png?raw=true" alt="Profile" />
                        </div>
                    </div>
                </section>

                <style>
               
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }

                .dashboard-banner {
                    display: flex;
                    background: rgb(94, 93, 69);
                    background: linear-gradient(125deg, rgba(94, 93, 69, 1) 0%, rgba(69, 68, 42, 1) 33%, rgba(50, 49, 23, 1) 100%);
                    border-radius: 46px;
                    border: 1px solid #42411F;
                    height: 20.35rem;
                    width: 95%;
                }

                #daily-tracker {
                    display: inline-block;
                    font-weight: bold;
                    color: #9A5311;
                    background-color: #B2D1EE;
                    border-radius: 5px;
                    padding: 5px 30px;
                    margin: 0;
                }

                #answer-daily-question {
                    color: #B2D1EE;
                }

                .info-banner-container {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 20px;
                    margin: 50px;
                }

                .dashboard-banner h2 {
                    text-align: start;
                    font-size: 35px;
                }

                .dashboard-banner a {
                    font-weight: bold;
                    color: #9A5311;
                    background-color: #E2D54B;
                    text-decoration: none;
                    border-radius: 10px;
                    padding: 10px 50px;
                    display: inline-block;
                }

                img {
                    position: relative;
                    bottom: 20.8rem; /* my favourite CSS directive ;) */
                    right: -14.9rem;
                    background-size: cover;
                    width: 22.8rem;
                    height: 22.5rem;
                }

                /* Ajustes solo para pantallas menores a 768px */
                @media screen and (max-width: 768px) {
                    .dashboard-banner {
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: auto; /* Ajuste automático de altura */
                        padding: 20px;
                    }

                    .info-banner-container {
                        align-items: center;
                        text-align: center;
                        margin: 0;
                        gap: 10px;
                    }

                    #daily-tracker,
                    #answer-daily-question,
                    .dashboard-banner h2,
                    .dashboard-banner a {
                        text-align: center;
                    }

                    .dashboard-banner img {
                        display: none; /* Oculta la imagen en pantallas pequeñas */
                    }
                }

                                
                </style>
            `;
        }
    }
}

customElements.define('dashboard-banner', DashboardBanner);
export default DashboardBanner;
