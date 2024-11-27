import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCyvOGlILDIN7I1lxvL17ZkkA7PB4eH664",
  authDomain: "mira-1e6e9.firebaseapp.com",
  projectId: "mira-1e6e9",
  storageBucket: "mira-1e6e9.appspot.com",
  messagingSenderId: "604412919945",
  appId: "1:604412919945:web:xxxxxxxxxxxxxx"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);