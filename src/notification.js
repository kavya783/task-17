import {
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { messaging } from "./firebase";
import { saveDeviceTokenActionInitiate } from "./redux/actions/deviceTokenAction";

export const requestNotificationPermission = async (dispatch) => {
  try {
    // Check browser support
    const supported = await isSupported();

    if (!supported) {
      // console.log("Firebase Messaging is not supported in this browser.");
      return;
    }

    // Request notification permission
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      // console.log("Notification permission denied.");
      return;
    }

    // Get FCM Token
    const token = await getToken(messaging, {
  vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
});

    if (!token) {
      // console.log("FCM Token not generated.");
      return;
    }

    // console.log("FCM Token:", token);

    // Get logged in user id
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      // console.log("User not logged in.");
      return;
    }

    // Save token in backend
    await dispatch(
      saveDeviceTokenActionInitiate({
        user_id: userId,
        token,
      })
    );

    // console.log("Token saved successfully.");

    return token;
  } catch (error) {
    // console.error("FCM Error:", error);
  }
};

// Listen for foreground notifications
export const listenForMessages = () => {
  try {
    onMessage(messaging, (payload) => {
      // console.log("Foreground Message:", payload);

      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/hr.png",
      });
    });
  } catch (error) {
    // console.error("Foreground Notification Error:", error);
  }
};