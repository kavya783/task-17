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


    if (permission !== "granted") {
      return null;
    }


    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
    });


    console.log("FCM TOKEN:", token);


    const userId = localStorage.getItem("user_id");


    if (!userId) {
      console.log("User id not found");
      return null;
    }


    await dispatch(
      saveDeviceTokenActionInitiate({
        user_id: userId,
        token: token,
      })
    );


    return token;


  } catch(error){

    console.log(error);
    return null;

  }

};



export const listenForMessages = () => {

  const unsubscribe = onMessage(
    messaging,
    (payload)=>{

      console.log(
        "Foreground notification:",
        payload
      );


      if(
        Notification.permission === "granted" &&
        payload.notification
      ){

        new Notification(
          payload.notification.title,
          {
            body: payload.notification.body,
            icon:"/hr.png"
          }
        );

      }

    }
  );


  return unsubscribe;

};