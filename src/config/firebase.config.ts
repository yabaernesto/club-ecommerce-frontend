import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDdoEQyEkcAn4xygf9p9F3IMqBp6vs8MZs',
  authDomain: 'club-ecommerce-da5c5.firebaseapp.com',
  projectId: 'club-ecommerce-da5c5',
  storageBucket: 'club-ecommerce-da5c5.firebasestorage.app',
  messagingSenderId: '161763787025',
  appId: '1:161763787025:web:8945a9ccebea0121040cb0'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
