import { appState, dispatch } from "../../store";
import { navigate } from "../../store/actions";
import { Screens } from "../../types/store";

export enum AsideAttribute {
    'profileimage' = 'profileimage',
    'name' = 'name',
    'description' = 'description'
}

class Aside extends HTMLElement {

    profileimage? : string;
    name? : string;
    description? : string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.keys(AsideAttribute);
    }

    attributeChangedCallback(propName: AsideAttribute, oldValue: string | undefined, newValue: string | undefined) {
        if (newValue !== oldValue) {
            this[propName] = newValue;

            this.render();
        }
    }


    connectedCallback() {
        this.render();
        this.addEventListeners();
        this.renderMoodMsg();
    }

    addEventListeners() {
        const searchInput = this.shadowRoot?.querySelector('#input');
        searchInput?.addEventListener('input', (event) => this.handleSearch(event));
        const profileImage = this.shadowRoot?.querySelector('.profile-info img');
        const profileName = this.shadowRoot?.querySelector('.profile-info .name');

        // Navegar a la pantalla de perfil de usuario al hacer clic en la imagen o el nombre
        profileImage?.addEventListener('click', () => this.navigateToUserProfile());
        profileName?.addEventListener('click', () => this.navigateToUserProfile());
    }

    // Método para navegar a la pantalla de perfil de usuario
    navigateToUserProfile() {
        dispatch(navigate(Screens.USERPROFILE)); // Navegar a USERPROFILE
    }


    handleSearch(event: Event) {
        const target = event.target as HTMLInputElement;
        const searchTerm = target.value.trim().toLowerCase();

        // Emitir un evento personalizado con el término de búsqueda
        const searchEvent = new CustomEvent('search', {
            detail: { searchTerm },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(searchEvent);
    }

    renderMoodMsg () {
        if (appState.moodmsg !== '') {
            const moodContainer = this.shadowRoot?.querySelector('.todays-mood');
            const moodMsg = this.ownerDocument.createElement('p')
            moodMsg.innerHTML = `${appState.moodmsg}`
            moodContainer?.appendChild(moodMsg)
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                
                <aside>
                    <p> QUICK SEARCH </p>
                    <div class="InputContainer">
                        <input type="text" name="text" class="input" id="input" placeholder="Type here to search">
                        <label for="input" class="labelforsearch">
                           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M14.3418 12.6544H13.4531L13.1381 12.3507C14.2787 11.0277 14.9056 9.33872 14.9043 7.59192C14.9043 6.14565 14.4754 4.73185 13.6719 3.52932C12.8684 2.32678 11.7264 1.38952 10.3902 0.836053C9.05399 0.282587 7.58369 0.137775 6.1652 0.41993C4.74672 0.702084 3.44375 1.39853 2.42108 2.4212C1.39841 3.44388 0.701962 4.74684 0.419808 6.16532C0.137653 7.58381 0.282465 9.05411 0.835931 10.3903C1.3894 11.7265 2.32666 12.8685 3.52919 13.672C4.73173 14.4756 6.14552 14.9044 7.5918 14.9044C9.40305 14.9044 11.068 14.2407 12.3505 13.1382L12.6543 13.4532V14.3419L18.2793 19.9557L19.9556 18.2794L14.3418 12.6544ZM7.5918 12.6544C4.79055 12.6544 2.5293 10.3932 2.5293 7.59192C2.5293 4.79067 4.79055 2.52942 7.5918 2.52942C10.3931 2.52942 12.6543 4.79067 12.6543 7.59192C12.6543 10.3932 10.3931 12.6544 7.5918 12.6544Z"
                                    fill="#BCB3AA" />
                            </svg>
                        </label>
                    </div>
                    <section class="todays-mood">
                        <h3>today's mood</h3>
                        
                    </section>
                    <section class="profile">
                        <p class="caption">Profile</p>
                        <div class="profile-info">
                             <img src="${this.profileimage === "" ? 'https://i.pinimg.com/564x/ec/0f/a7/ec0fa7e18612c6a5239742cfd9dd6c46.jpg' : this.profileimage }" alt="Profile" />
                            <p class="name">${this.name}</p>
                            <p class="quote">${this.description}</p>
                        </div>
                         <div class="leads">
                            

                        </div>
                    </section>
                    </section>
                </aside>
                <style>
                /* CSS original para el aside */
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

aside {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
    height: 81vh;
    width: 100%;
    background-color: #343109;
    box-sizing: border-box;
    overflow-y: none;
}

aside p {
    font-weight: 600;
    font-size: 20px;
    align-self: flex-start;
}

.InputContainer {
    height: 45px;
    max-width: 380px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #FCF3E4;
    border-radius: 30px;
    overflow: hidden;
    cursor: pointer;
    padding: 0 18px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.075);
}

.input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    background-color: #FCF3E4;
    color: #BCB3AA;
}

.input::placeholder {
    color: #BCB3AA;
    font-weight: 500;
    font-size: 16px;
}

.labelforsearch {
    cursor: text;
    padding: 0px 12px;
}

.searchIcon {
    width: 13px;
}

.todays-mood {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 370px;
    height: 160px;
    border-radius: 30px;
    padding-top: 12px;
    background-color: #9A5311;
}

.todays-mood h3 {
    font-family: "Times New Roman", serif;
    font-weight: 400;
    font-size: 2rem;
    font-style: italic;
    color: #E2D54B;
}

.profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    border-radius: 30px;
    background-color: #B2D1EE;
}

.profile .caption {
    padding: 40px 0 0 30px;
    align-self: flex-start;
    color: #9A5311;
}

.profile .profile-info .name {
    font-size: 1.5rem;
    color: #9A5311;
}

.profile .profile-info .quote {
    font-weight: 200;
    color: #9A5311;
    font-size: 1rem;
}

.profile .leads {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 30px;
    width: 100%;
    border-radius: 0 0 30px 30px;
    padding: 30px 0;
    background-color: #9A5311;
    height: 5%;
}


img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
}

/* Ajustes solo para pantallas menores a 768px */
@media screen and (max-width: 768px) {
    aside {
        display: none; /* Oculta completamente el aside */
    }
}

                </style>
            `;
        }
    }
}

customElements.define('aside-component', Aside);
export default Aside;