import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

let db: any;
let auth: any;

const getFirebaseInstance = async () => {
    if (!db) {
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

// Función para agregar publicaciones
export const addPosts = async (publication: any) => {
    try {
        const { db } = await getFirebaseInstance();
        const postsCollection = collection(db, 'publications');
        await addDoc(postsCollection, publication);
        console.log('Publicación añadida con éxito');
    } catch (error) {
        console.error('Error añadiendo el documento:', error);
    }
};

// Función para obtener publicaciones
export const getPosts = async () => {
    try {
        const { db } = await getFirebaseInstance();
        const postsCollection = collection(db, 'publications');
        const querySnapshot = await getDocs(postsCollection);
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        return data;
    } catch (error) {
        console.error('Error obteniendo los documentos:', error);
        return [];
    }
};

// Función para registrar usuario
export const registerUser = async (credentials: any) => {
    try {
        const { auth, db } = await getFirebaseInstance();
        const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

        const usersCollection = collection(db, 'users');
        const userDoc = {
            firstname: credentials.firstname,
            lastname: credentials.lastname,
            email: credentials.email,
            uid: userCredential.user.uid
        };

        await addDoc(usersCollection, userDoc);
        return userCredential.user.uid; // Devuelve el UID del usuario
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        return null;
    }
};

// Función para obtener datos del usuario desde Firebase
export const getUserData = async (uid: string) => {
    try {
        const { db } = await getFirebaseInstance();
        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data();
        } else {
            console.error("No se encontró el usuario con el UID especificado.");
            return null;
        }
    } catch (error) {
        console.error("Error obteniendo los datos del usuario:", error);
        return null;
    }
};

// Función para actualizar datos del usuario
export const updateUserData = async (uid: string, userData: Record<string, any>): Promise<void> => {
    try {
        const { db } = await getFirebaseInstance();
        const userDocRef = doc(db, 'users', uid);
        await updateDoc(userDocRef, userData);
        console.log('User data updated successfully');
    } catch (error) {
        console.error('Error updating user data:', error);
    }
};

// Función para iniciar sesión
export const loginUser = async (email: string, password: string) => {
    try {
        const { auth } = await getFirebaseInstance();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Usuario logueado:', userCredential.user);
        return true;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return false;
    }
};

// Función para cerrar sesión
export const logOut = async (): Promise<void> => {
    try {
        const { auth } = await getFirebaseInstance();
        await signOut(auth);
        console.log("Usuario deslogueado exitosamente");
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
};
