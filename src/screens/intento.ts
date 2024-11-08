import { getPostImage } from '../utils/firebase';
import { addObserver, appState, dispatch } from '../store';
import { } from '../store/actions';


class Profile extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	async connectedCallback() {
		
	}

	async render() {
		if (this.shadowRoot) {
			const title = this.ownerDocument.createElement('h1');
			title.innerText = 'Pérfil';
			this.shadowRoot.appendChild(title);

            const pImage = this.ownerDocument.createElement('input');
            pImage.type ='file';
            pImage.addEventListener('change',()=> {
                console.log(pImage)
                const file = pImage .files?.[0]
            });
            this.shadowRoot.appendChild(pImage);


		

			appState.productsByUser.forEach((product: any) => {
				const name = this.ownerDocument.createElement('h2');
				name.innerText = product.name;
				this.shadowRoot?.appendChild(name);

			
			});
		}
	}
}

customElements.define('app-profile', Profile);
export default Profile;