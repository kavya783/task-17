importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

console.log("🔥 Firebase Messaging Service Worker Loaded");

firebase.initializeApp({
  apiKey:
    "AIzaSyAv084Ntun-ARUYT89NwXkwV4LuBRU4Cq8",

  authDomain:
    "hr-portal-7ab0e.firebaseapp.com",

  projectId:
    "hr-portal-7ab0e",

  storageBucket:
    "hr-portal-7ab0e.firebasestorage.app",

  messagingSenderId:
    "194012946842",

  appId:
    "1:194012946842:web:5faade00108311cf5dda23",

  measurementId:
    "G-BHCMLCTZEQ",
});

const messaging =
  firebase.messaging();

console.log(
  "✅ Firebase Messaging initialized in Service Worker"
);

messaging.onBackgroundMessage(
  (payload) => {
    console.log(
      "🔥 Background message received:",
      payload
    );

    const notificationTitle =
      payload.notification?.title ||
      payload.data?.title ||
      "HR Portal";

    const notificationOptions = {
      body:
        payload.notification?.body ||
        payload.data?.body ||
        "You have a new notification.",

      icon: "/hr.png",

      data: payload.data || {},
    };

    self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  }
);