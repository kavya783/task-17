import { getFirebaseMessaging } from "./firebase";

const API_URL = process.env.REACT_APP_API_URL;

export const requestNotificationPermission = async () => {
  try {
    const messaging = await getFirebaseMessaging();

    if (!messaging) {
      return null;
    }

    if (!("Notification" in window)) {
      console.error("Browser does not support notifications");
      return null;
    }

    let permission = Notification.permission;

    if (permission !== "granted") {
      permission = await Notification.requestPermission();
    }

    if (permission !== "granted") {
      return null;
    }

    if (!("serviceWorker" in navigator)) {
      console.error("Service Worker is not supported");
      return null;
    }

    const registration =
      await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );

    const { getToken } = await import(
      "firebase/messaging"
    );

    const token = await getToken(messaging, {
      vapidKey:
        process.env.REACT_APP_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (!token) {
      return null;
    }

    const authToken = localStorage.getItem("token");

    if (!authToken) {
      return token;
    }

    const response = await fetch(
      `${API_URL}/api/device_tokens`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          token,
        }),
      }
    );

    if (!response.ok) {
      console.error(
        "Failed to save FCM token"
      );
    }

    return token;
  } catch (error) {
    console.error(
      "FCM initialization error:",
      error
    );

    return null;
  }
};

export const saveFcmToken = async () => {
  return requestNotificationPermission();
};

export const listenForMessages = async () => {
  try {
    const messaging =
      await getFirebaseMessaging();

    if (!messaging) {
      return () => {};
    }

    const { onMessage } = await import(
      "firebase/messaging"
    );

    return onMessage(
      messaging,
      (payload) => {
        const title =
          payload.notification?.title ||
          "HR Portal";

        const body =
          payload.notification?.body || "";

        if (
          "Notification" in window &&
          Notification.permission === "granted"
        ) {
          new Notification(title, {
            body,
            icon: "/hr.png",
          });
        }
      }
    );
  } catch (error) {
    console.error(
      "Foreground notification initialization failed:",
      error
    );

    return () => {};
  }
};