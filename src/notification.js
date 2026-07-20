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
      console.log("Firebase messaging not supported");
      return null;
    }


    const permission = await Notification.requestPermission();

    console.log("Permission:", permission);


    if (permission !== "granted") {
      return null;
    }


    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
    });


    console.log("FCM TOKEN:", token);


    const userId = localStorage.getItem("user_id");

    console.log("USER ID:", userId);


    if (!userId) {
      console.log("USER ID NOT FOUND");
      return null;
    }


    const response = await dispatch(
      saveDeviceTokenActionInitiate({
        user_id: userId,
        token: token,
      })
    );


    console.log("DEVICE TOKEN SAVED:", response);


    return token;


  } catch(error) {

    console.log("FCM ERROR:", error);

    return null;
  }
};