import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAv084Ntun-ARUYT89NwXkwV4LuBRU4Cq8",
  authDomain: "hr-portal-7ab0e.firebaseapp.com",
  projectId: "hr-portal-7ab0e",
  storageBucket: "hr-portal-7ab0e.firebasestorage.app",
  messagingSenderId: "194012946842",
  appId: "1:194012946842:web:5faade00108311cf5dda23",
  measurementId: "G-BHCMLCTZEQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const messaging = getMessaging(app);

export { app, analytics };