importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAv084Ntun-ARUYT89NwXkwV4LuBRU4Cq8",
  authDomain: "hr-portal-7ab0e.firebaseapp.com",
  projectId: "hr-portal-7ab0e",
  storageBucket: "hr-portal-7ab0e.firebasestorage.app",
  messagingSenderId: "194012946842",
  appId: "1:194012946842:web:5faade00108311cf5dda23",
  measurementId: "G-BHCMLCTZEQ",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/hr.png",
    }
  );
});