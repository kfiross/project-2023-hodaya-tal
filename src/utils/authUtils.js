import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth, UserCredential} from "firebase/auth";
import firebase_app from "../firebase";

const auth  = getAuth(firebase_app);

class AuthUtils {
    /**
     * @returns {string}
     */
    static userId(){
        return auth.currentUser?.uid;
    }

    /**
     * @returns {boolean}
     */
    static isLoggedIn(){
        return auth.currentUser != null;
    }

    /**
     *
     * @param {string} taz
     * @param {string} password
     * @returns {Promise<{ user: UserCredential|null, error: any }>}
     */
    static async loginUser(taz, password){
        let user = null;
        let error = null;

        try {
            let email = `${taz}@app.com`
            user = await signInWithEmailAndPassword(auth, email, password);
        }
        catch (e){
            error = e;
        }

        return {user, error}
    }

    /**
     *
     * @param {string} taz
     * @param {string} password
     * @returns {Promise<{ user: UserCredential|null, error: any }>}
     */
    static async registerUser(taz, password) {
        let user = null;
        let error = null;

        try {
            let email = `${taz}@app.com`
            user = await createUserWithEmailAndPassword(auth, email, password);
        }
        catch (e){
            error = e;
        }

        return {user, error}
    }

    /**
     *
     * @returns {Promise<boolean>}
     */
    static async logoutUser() {
        try {
            await signOut(auth);
            return true;
        }
        catch (e){
            console.log(e)
        }

        return false;
    }
}

export default AuthUtils;
