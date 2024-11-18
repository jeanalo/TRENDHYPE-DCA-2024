import ProfileImage, { ProfileImageAttribute } from '../ProfileImage/ProfileImage';
import { dispatch } from '../../store/index';
import { navigate } from '../../store/actions';
import { Screens } from '../../types/store';

class Aside extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners(); // Agregamos los eventos después de renderizar
    }

    // Método para agregar eventos de clic
    addEventListeners() {
        const profileImage = this.shadowRoot?.querySelector('profile-image');
        const profileName = this.shadowRoot?.querySelector('.profile-info .name');

        // Navegar a la pantalla de perfil de usuario al hacer clic en la imagen o el nombre
        profileImage?.addEventListener('click', () => this.navigateToUserProfile());
        profileName?.addEventListener('click', () => this.navigateToUserProfile());
    }

    // Método para navegar a la pantalla de perfil de usuario
    navigateToUserProfile() {
        dispatch(navigate(Screens.USERPROFILE)); // Navegar a USERPROFILE
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="../src/components/Aside/aside.css">
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
                            <!-- Usando el nuevo componente profile-image -->
                            <profile-image
                                ${ProfileImageAttribute.src}="https://i.pinimg.com/originals/48/ba/1a/48ba1a4c2e697e1a1ed117919a9421d5.jpg"
                                ${ProfileImageAttribute.alt}="User Profile Image">
                            </profile-image>
                            <p class="name"> Jeanalomia </p>
                            <p class="quote"> Chasing dreams and making memories </p>
                        </div>
                        <div class="leads">
                            <div class="lead">
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 15C13.0406 15 11.3633 14.3023 9.96797 12.907C8.57266 11.5117 7.875 9.83438 7.875 7.875C7.875 5.91562 8.57266 4.23828 9.96797 2.84297C11.3633 1.44766 13.0406 0.75 15 0.75C16.9594 0.75 18.6367 1.44766 20.032 2.84297C21.4273 4.23828 22.125 5.91562 22.125 7.875C22.125 9.83438 21.4273 11.5117 20.032 12.907C18.6367 14.3023 16.9594 15 15 15ZM0.75 29.25V24.2625C0.75 23.2531 1.01006 22.3257 1.53019 21.4802C2.05031 20.6347 2.74025 19.9887 3.6 19.5422C5.44062 18.6219 7.31094 17.9319 9.21094 17.4724C11.1109 17.0128 13.0406 16.7824 15 16.7812C16.9594 16.7801 18.8891 17.0104 20.7891 17.4724C22.6891 17.9343 24.5594 18.6243 26.4 19.5422C27.2609 19.9875 27.9515 20.6335 28.4716 21.4802C28.9917 22.3269 29.2512 23.2543 29.25 24.2625V29.25H0.75Z" fill="#E2D54B"/>
                                </svg>
                                <p> 500k </p>
                            </div>
                            <div class="lead">
                                <svg width="34" height="31" viewBox="0 0 34 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.5625 30.3922L14.1609 28.2059C5.63125 20.4712 0 15.3534 0 9.10937C0 3.99156 4.00813 0 9.10938 0C11.9913 0 14.7572 1.34156 16.5625 3.445C18.3678 1.34156 21.1337 0 24.0156 0C29.1169 0 33.125 3.99156 33.125 9.10937C33.125 15.3534 27.4937 20.4712 18.9641 28.2059L16.5625 30.3922Z" fill="#E2D54B"/>
                                </svg>
                                <p> 2M </p>
                            </div>
                        </div>
                    </section>
                </aside>
            `;
        }
    }
}

customElements.define('aside-component', Aside);
export default Aside;
