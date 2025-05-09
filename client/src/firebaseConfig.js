// firebase_auth.js
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyD5vFx59vskL2b_gqTb9W6cF47Tx81ppGM',
  authDomain: 'auth-95ed0.firebaseapp.com',
  projectId: 'auth-95ed0',
  appId: '1:391657607329:web:40efb408f3da5d67a260e0',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {
  auth,
  provider,
  signInWithRedirect,
  getRedirectResult,
  signInWithPopup,
  signOut,
}
