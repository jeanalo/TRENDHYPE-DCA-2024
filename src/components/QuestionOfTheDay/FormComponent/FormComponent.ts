import { dispatch } from '../../../store/index';
import { navigate } from '../../../store/actions';
import { Screens } from '../../../types/store';

export enum FormAttribute {
    question1 = 'question1',
    question2 = 'question2',
    question3 = 'question3'
}

class FormComponent extends HTMLElement {
    question1?: string;
    question2?: string;
    question3?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.values(FormAttribute);
    }

    attributeChangedCallback(name: FormAttribute, oldValue: string | null, newValue: string | null) {
        (this as any)[name] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
        this.attachEvents();
    }

    attachEvents() {
        if (this.shadowRoot) {
            const options = this.shadowRoot.querySelectorAll('.option');
            const form = this.shadowRoot.querySelector('.quiz');

            options.forEach(option => {
                option.addEventListener('click', (e: Event) => {
                    e.preventDefault();
                    const target = e.target as HTMLElement;
                    console.log(`Selected option: ${target.textContent}`);
                });
            });

            // Evento de submit en el formulario
            form?.addEventListener('submit', (e: Event) => {
                e.preventDefault();
                alert('Form submitted! Processing result...');
                this.navigateToDashboard(); // Llama a la función para navegar al dashboard
            });
        }
    }

    // Método para navegar a la pantalla de DASHBOARD
    navigateToDashboard() {
        dispatch(navigate(Screens.DASHBOARD)); // Navegar a DASHBOARD
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="./src/components/QuestionOfTheDay/FormComponent/FormComponent.css">

                <style>
                
                .quiz {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .question {
                    width: 100%;
                    max-width: 600px;
                    text-align: center;
                    margin-bottom: 40px;
                }

                .question h2 {
                    font-size: 18px;
                    color: #FFA726;
                    margin-bottom: 10px;
                    padding: 10px;
                    border-radius: 30px;
                    background-color: #E2D54B;
                }

                /* Estilos específicos para cada pregunta */
                #question1 h2 {
                    color: #9a5311;
                    background-color: #E2D54B;
                }

                #question2 h2 {
                    background-color: #9a5311;
                    color: #e5d152;
                }

                #question3 h2 {
                    background-color: #b2d1ee;
                    color: #9a5311;
                }

                .option {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 80%;
                    margin: 5px auto;
                    padding: 10px;
                    background-color: #46410B;
                    color: #FFFFFF;
                    border: none;
                    border-radius: 30px;
                    cursor: pointer;
                    font-size: 16px;
                }

                .option span {
                    margin-left: 8px;
                }

                .option:hover {
                    background-color: #787878;
                }

                /* Estilo del botón de submit */
                .submit-button {
                    position: relative;
                    width: 25%;
                    border: none;
                    background: none;
                    cursor: pointer;
                    margin: 20px auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 60px;
                }

                .submit-button img {
                    width: 100%;
                    border-radius: 20px;
                    filter: blur(2px);
                }

                .submit-button::before {
                    content: 'SUBMIT';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #FFFFFF;
                    font-size: 20px;
                    font-weight: bold;
                    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
                    z-index: 1;
                }

                @media (max-width: 600px) {
                    .container {
                        width: 100%;
                        padding: 10px;
                    }

                    .submit-button {
                        width: 40%;
                        margin: 10px auto;
                    }

                    .submit-button::before {
                        font-size: 16px;
                    }
                }

                </style>
                <form class="quiz">
                    <div class="question" id="question1">
                        <h2 class="question-title">${this.question1 || 'WHAT COLORS DO YOU PREFER TO WEAR TODAY?'}</h2>
                        <button class="option">🖤<span> Neutral</span></button>
                        <button class="option">🌈<span> Vibrant</span></button>
                    </div>
                    <div class="question" id="question2">
                        <h2 class="question-title">${this.question2 || 'WHAT TYPE OF CLOTHING INSPIRES YOU TODAY?'}</h2>
                        <button class="option">👔 <span>Classic</span></button>
                        <button class="option">👖 <span>Modern</span></button>
                    </div>
                    <div class="question" id="question3">
                        <h2 class="question-title">${this.question3 || 'WHAT ACCESSORY IS A MUST FOR YOUR LOOK TODAY?'}</h2>
                        <button class="option">⌚ <span>Minimalist</span></button>
                        <button class="option">💍 <span>Statement</span></button>
                    </div>
                    <button type="submit" class="submit-button">
                        <img src="https://github.com/jeanalo/IMG-assets/blob/main/Button.png?raw=true" alt="">
                    </button>
                </form>
            `;
        }
    }
}

customElements.define('form-component', FormComponent);
export default FormComponent;
