import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDdoEQyEkcAn4xygf9p9F3IMqBp6vs8MZs',
  authDomain: 'club-ecommerce-da5c5.firebaseapp.com',
  projectId: 'club-ecommerce-da5c5',
  storageBucket: 'club-ecommerce-da5c5.firebasestorage.app',
  messagingSenderId: '161763787025',
  appId: '1:161763787025:web:8945a9ccebea0121040cb0'
}

export const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
