import { getFirebaseMessaging } from "./firebase";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:3000";

const VAPID_KEY =
  process.env.REACT_APP_FIREBASE_VAPID_KEY;

console.log("🔥🔥 NEW NOTIFICATION FILE LOADED 🔥🔥");
console.log("ENV API URL:", process.env.REACT_APP_API_URL);
console.log("FINAL API URL:", API_URL);

export const requestNotificationPermission = async () => {
  try {
    console.log("=================================");
    console.log("🔥 FCM 1 - started");
    console.log("=================================");

    console.log("VAPID KEY EXISTS:", !!VAPID_KEY);
    console.log("VAPID KEY:", VAPID_KEY);

    if (!VAPID_KEY) {
      console.error(
        "❌ Firebase VAPID key is missing"
      );

      return null;
    }

    console.log("API URL:", API_URL);

    if (!API_URL) {
      console.error(
        "❌ REACT_APP_API_URL is missing"
      );

      return null;
    }

   
    if (!("Notification" in window)) {
      console.error(
        "❌ Browser notifications are not supported"
      );

      return null;
    }

    if (!("serviceWorker" in navigator)) {
      console.error(
        "❌ Service Worker is not supported"
      );

      return null;
    }

    console.log("✅ Browser supports notifications");
    console.log("✅ Service Worker supported");


    console.log(
      "⏳ Getting Firebase Messaging..."
    );

    const messaging = await getFirebaseMessaging();

    if (!messaging) {
      console.error(
        "❌ Firebase Messaging unavailable"
      );

      return null;
    }

    console.log(
      "✅ Firebase Messaging initialized"
    );

    
    let permission = Notification.permission;

    console.log(
      "Current notification permission:",
      permission
    );

    if (permission !== "granted") {
      console.log(
        "⏳ Requesting notification permission..."
      );

      permission =
        await Notification.requestPermission();
    }

    console.log(
      "FCM permission:",
      permission
    );

    if (permission !== "granted") {
      console.error(
        "❌ Notification permission denied"
      );

      return null;
    }

    console.log(
      "✅ Notification permission granted"
    );

   

    console.log(
      "⏳ Registering Firebase Service Worker..."
    );

    const registration =
      await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );

    console.log(
      "✅ Service Worker registered successfully"
    );

    console.log(
      "Service Worker registration:",
      registration
    );

    // Wait until service worker is ready
    const readyRegistration =
      await navigator.serviceWorker.ready;

    console.log(
      "✅ Service Worker is ready:",
      readyRegistration
    );

    // ------------------------------------
    // 7. Import Firebase getToken
    // ------------------------------------
    console.log(
      "⏳ Loading Firebase getToken..."
    );

    const { getToken } =
      await import("firebase/messaging");

    console.log(
      "✅ Firebase getToken loaded"
    );

    // ------------------------------------
    // 8. Generate FCM Token
    // ------------------------------------
    console.log(
      "================================="
    );

    console.log(
      "🔥 BEFORE GET TOKEN"
    );

    console.log(
      "Messaging:",
      messaging
    );

    console.log(
      "VAPID key exists:",
      !!VAPID_KEY
    );

    console.log(
      "Service Worker:",
      readyRegistration
    );

    console.log(
      "================================="
    );

    const token = await getToken(
      messaging,
      {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration:
          readyRegistration,
      }
    );

    console.log(
      "🔥 AFTER GET TOKEN"
    );

    console.log(
      "FCM TOKEN:",
      token
    );

    // ------------------------------------
    // 9. Check token
    // ------------------------------------
    if (!token) {
      console.error(
        "❌ FCM TOKEN IS EMPTY"
      );

      return null;
    }

    console.log(
      "✅ FCM TOKEN GENERATED SUCCESSFULLY"
    );

    // ------------------------------------
    // 10. Get JWT token
    // ------------------------------------
    const authToken =
      localStorage.getItem("token");

    console.log(
      "AUTH TOKEN EXISTS:",
      !!authToken
    );

    if (!authToken) {
      console.warn(
        "⚠️ JWT token missing"
      );

      console.log(
        "Returning FCM token without saving to backend"
      );

      return token;
    }

    // ------------------------------------
    // 11. Save FCM token to Rails backend
    // ------------------------------------
    console.log(
      "================================="
    );

    console.log(
      "🚀 Calling /api/device_tokens..."
    );

    console.log(
      "Endpoint:",
      `${API_URL}/api/device_tokens`
    );

    console.log(
      "================================="
    );

    const response = await fetch(
      `${API_URL}/api/device_tokens`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${authToken}`,
        },

        body: JSON.stringify({
          token: token,
        }),
      }
    );

    console.log(
      "device_tokens status:",
      response.status
    );

    // ------------------------------------
    // 12. Read response safely
    // ------------------------------------
    const responseText =
      await response.text();

    console.log(
      "device_tokens raw response:",
      responseText
    );

    let data = null;

    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.warn(
        "⚠️ Response is not JSON"
      );
    }

    console.log(
      "device_tokens response:",
      data
    );

    // ------------------------------------
    // 13. Check backend response
    // ------------------------------------
    if (!response.ok) {
      console.error(
        "❌ Failed to save FCM token"
      );

      throw new Error(
        `Device token API failed: ${response.status}`
      );
    }

    console.log(
      "================================="
    );

    console.log(
      "✅ FCM TOKEN SAVED SUCCESSFULLY"
    );

    console.log(
      "================================="
    );

    return token;

  } catch (error) {
    console.error(
      "================================="
    );

    console.error(
      "❌ FCM ERROR"
    );

    console.error(
      "Error:",
      error
    );

    console.error(
      "Error message:",
      error?.message
    );

    console.error(
      "Error code:",
      error?.code
    );

    console.error(
      "Error stack:",
      error?.stack
    );

    console.error(
      "================================="
    );

    return null;
  }
};