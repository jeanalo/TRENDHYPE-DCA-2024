// import imgBanner, { ImgBannerAttribute } from '../../components/Login/imgField/imgField';
// import loginForm, { LoginAttribute } from '../../components/Login/loginField/loginField';
// import registerCard, { RegisterFieldAttribute } from '../../components/Login/registerField/registerField';
// import { dispatch } from '../../store';
// import { navigate } from '../../store/actions';
// import { Screens } from '../../types/store';
// import { loginUser } from '../../utils/firebase';

// const credentials = {
//     email: '',
//     password: '',
// };

// class Login extends HTMLElement {
//     constructor() {
//         super();
//         this.attachShadow({ mode: 'open' });
//     }

//     connectedCallback() {
//         this.render();
//         const registerCardComponent = new registerCard();
//     }

//     changeEmail(e: any) {
//         credentials.email = e.target.value;
//     }

//     changePassword(e: any) {
//         credentials.password = e.target.value;
//     }

//     async submitForm() {
//         const resp = await loginUser(credentials.email, credentials.password);
//         resp ? dispatch(navigate(Screens.DASHBOARD)) : alert('Incorrect credentials or user does not exist');
//     }

//     async render() {
//         if (this.shadowRoot) {
//             this.shadowRoot.innerHTML = ''; // Clear existing content

//             // Crear e instanciar el componente imgBanner
//             const title = new imgBanner();
//             title.setAttribute(ImgBannerAttribute.img, 'path/to/image.jpg');
//             title.setAttribute(ImgBannerAttribute.trendtext, 'Welcome to TrendHype');
//             title.setAttribute(ImgBannerAttribute.opacitylayer, '0.5');
//             this.shadowRoot.appendChild(title);

//             // Crear e instanciar el componente loginForm
//             const loginFormComponent = new loginForm();
//             loginFormComponent.setAttribute(LoginAttribute.logintittle, 'Login');
//             loginFormComponent.setAttribute(LoginAttribute.emailinput, '');
//             loginFormComponent.setAttribute(LoginAttribute.passwordinput, '');
//             loginFormComponent.setAttribute(LoginAttribute.loginbutton, 'Log In');
//             this.shadowRoot.appendChild(loginFormComponent);

//             // Crear e instanciar el componente registerCard
//             const registerCardComponent = new registerCard();
//             registerCardComponent.setAttribute(RegisterFieldAttribute.newintext, 'New here?');
//             registerCardComponent.setAttribute(RegisterFieldAttribute.jointext, 'Join now');
//             registerCardComponent.setAttribute(RegisterFieldAttribute.registerbutton, 'Register');
//             this.shadowRoot.appendChild(registerCardComponent);
//         }
//     }
// }

// customElements.define('app-login', Login);
// export default Login;