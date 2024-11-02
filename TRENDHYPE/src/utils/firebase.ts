let db: any;
let auth: any;

const getFirebaseInstance = async () => {
    if (!db) {
        const { getFirestore } = await import('firebase/firestore');
        const { initializeApp } = await import('firebase/app');
        const { getAuth } = await import('firebase/auth');

        const firebaseConfig = {
            apiKey: "AIzaSyD-u3jetStWs47fMyfvAGsF5X4ggGwej4A",
            authDomain: "trendhype.firebaseapp.com",
            projectId: "trendhype",
            storageBucket: "trendhype.appspot.com",
            messagingSenderId: "128542655290",
            appId: "1:128542655290:web:452dd40b18fa84b4cc4603",
            measurementId: "G-8LGLM4JT81"
          };

        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
    }
    return { db, auth };
};

export const addPosts = async (product: any) => {
	try {
		const { db } = await getFirebaseInstance();
		const { collection, addDoc } = await import('firebase/firestore');

		const where = collection(db, 'publications');
		await addDoc(where, product);
		console.log('Se añadió con exito');
	} catch (error) {
		console.error('Error adding document', error);
	}
};

export const getPosts = async () => {
	try {
		const { db } = await getFirebaseInstance();
		const { collection, getDocs } = await import('firebase/firestore');

		const where = collection(db, 'publications');
		const querySnapshot = await getDocs(where);
		const data: any[] = [];

		querySnapshot.forEach((doc) => {
			data.push(doc.data());
		});

		return data;
	} catch (error) {
		console.error('Error getting documents', error);
	}
};

export const registerUser = async (credentials: any) => {
	try {
		const { auth, db } = await getFirebaseInstance();
		const { createUserWithEmailAndPassword } = await import('firebase/auth');
		const { doc, setDoc } = await import('firebase/firestore');

		const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

		const where = doc(db, 'users', userCredential.user.uid);
		const data = {
			firstname: credentials.firstname,
			lastname: credentials.lastname,
		};

		await setDoc(where, data);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const loginUser = async (email: string, password: string) => {
	try {
	  const { auth } = await getFirebaseInstance();
	  const { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } = await import('firebase/auth');
  
	  await setPersistence(auth, browserLocalPersistence);
	  const userCredential = await signInWithEmailAndPassword(auth, email, password);
	  console.log('Login successful:', userCredential.user);
	  return true;
	} catch (error) {
	  console.error('Error logging in:', error);
	  return false;
	}
  };
  
  export const logOut = async () => {
	const { auth } = await getFirebaseInstance();
	const { signOut } = await import('firebase/auth');
  
	try {
	  await signOut(auth); // Cierra la sesión del usuario
	  console.log("Usuario deslogueado exitosamente");
	} catch (error) {
	  console.error("Error al cerrar sesión:", error);
	}
};