import {
  getToken,
  onMessage
} from "firebase/messaging";

import { messaging } from "./firebase";

const API_URL = process.env.REACT_APP_API_URL;

export const requestNotificationPermission = async () => {
  try {
    console.log("========== FCM START ==========");

    if (!messaging) {
      console.error("Firebase messaging is not initialized");
      return null;
    }

    if (!("Notification" in window)) {
      console.error("Browser does not support notifications");
      return null;
    }

    // Ask permission
    let permission = Notification.permission;

    if (permission !== "granted") {
      permission = await Notification.requestPermission();
    }

    console.log("Notification permission:", permission);

    if (permission !== "granted") {
      console.warn("Notification permission denied");
      return null;
    }

    // Make sure service worker exists
    if (!("serviceWorker" in navigator)) {
      console.error("Service Worker is not supported");
      return null;
    }

    const registration =
      await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );

    console.log(
      "Firebase service worker registered:",
      registration
    );

    // Get FCM token
    const token = await getToken(
      messaging,
      {
        vapidKey:
          process.env.REACT_APP_FIREBASE_VAPID_KEY,

        serviceWorkerRegistration:
          registration
      }
    );

    if (!token) {
      console.error("FCM token was not generated");
      return null;
    }

    console.log("========== FCM TOKEN ==========");
    console.log(token);
    console.log("===============================");

    // Rails JWT token
    const authToken =
      localStorage.getItem("token");

    console.log(
      "Auth token exists:",
      !!authToken
    );

    if (!authToken) {
      console.error(
        "JWT token not found in localStorage"
      );

      return token;
    }

    // Save FCM token in Rails
    const response = await fetch(
      `${API_URL}/api/device_tokens`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },

        body: JSON.stringify({
          token: token
        })
      }
    );

    const data = await response.json();

    console.log(
      "Device token API response:",
      response.status,
      data
    );

    if (!response.ok) {
      console.error(
        "Failed to save FCM token:",
        data
      );

      return token;
    }

    console.log(
      "========== FCM TOKEN SAVED =========="
    );

    return token;

  } catch (error) {

    console.error(
      "FCM initialization error:",
      error
    );

    return null;
  }
};


// Keep this also because other files may use it
export const saveFcmToken = async () => {
  return requestNotificationPermission();
};


// Foreground notification
export const listenForMessages = () => {

  if (!messaging) {
    console.error(
      "Firebase messaging is not initialized"
    );

    return () => {};
  }

  const unsubscribe = onMessage(
    messaging,
    (payload) => {

      console.log(
        "Foreground FCM message:",
        payload
      );

      const title =
        payload.notification?.title ||
        "HR Portal";

      const body =
        payload.notification?.body ||
        "";

      if (
        "Notification" in window &&
        Notification.permission === "granted"
      ) {

        new Notification(
          title,
          {
            body: body,
            icon: "/hr.png"
          }
        );
      }
    }
  );

  return unsubscribe;
};