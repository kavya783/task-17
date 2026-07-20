import {
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { messaging } from "./firebase";
import { saveDeviceTokenActionInitiate } from "./redux/actions/deviceTokenAction";

export const requestNotificationPermission = async (dispatch) => {
  try {

    const supported = await isSupported();

    if (!supported) {
      return;
    }

    const permission = await Notification.requestPermission();

    console.log("Permission:", permission);

    if (permission !== "granted") {
      return;
    }

    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
    });

    console.log("FCM TOKEN:", token);

    const userId = localStorage.getItem("user_id");

    console.log("USER ID:", userId);

    if (!userId) {
      return;
    }

    await dispatch(
      saveDeviceTokenActionInitiate({
        user_id: userId,
        token,
      })
    );

  } catch (error) {
    console.log(error);
  }
};

// Listen for foreground notifications
export const listenForMessages = () => {
  const unsubscribe = onMessage(messaging, (payload) => {

    console.log("Foreground notification:", payload);

    if (Notification.permission === "granted" && payload?.notification) {
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/hr.png",
      });
    }

  });

  return unsubscribe;
};