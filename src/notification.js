import {
  getToken,
  onMessage
} from "firebase/messaging";

import { messaging } from "./firebase";

const API_URL = process.env.REACT_APP_API_URL;

// Request notification permission + generate/save FCM token
export const requestNotificationPermission = async () => {
  try {
    if (!messaging) {
      console.error("Firebase messaging is not initialized");
      return null;
    }

    if (!("Notification" in window)) {
      console.error("This browser does not support notifications");
      return null;
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.warn("Notification permission denied");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
    });

    if (!token) {
      console.warn("FCM token was not generated");
      return null;
    }

    console.log("FCM TOKEN:", token);

    const authToken = localStorage.getItem("token");

    if (!authToken) {
      console.warn("User authentication token not found");
      return token;
    }

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

    if (!response.ok) {
      console.error(
        "Failed to save FCM token:",
        data
      );

      return token;
    }

    console.log(
      "FCM token saved successfully:",
      data
    );

    return token;

  } catch (error) {
    console.error(
      "FCM token error:",
      error
    );

    return null;
  }
};


// Keep this function if other files are already using saveFcmToken
export const saveFcmToken = async () => {
  return requestNotificationPermission();
};


// Foreground notifications
export const listenForMessages = () => {
  if (!messaging) {
    console.error("Firebase messaging is not initialized");
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