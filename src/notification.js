import {
  getToken,
  onMessage,
} from "firebase/messaging";

import { messaging } from "./firebase";
import { saveDeviceTokenActionInitiate } from "./redux/actions/deviceTokenAction";


export const requestNotificationPermission = async (dispatch) => {

  try {

    const permission = await Notification.requestPermission();

    if(permission !== "granted"){
      console.log("Notification permission denied");
      return;
    }


    const token = await getToken(messaging,{
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
    });


    console.log("FCM TOKEN:", token);


    if(token){

      await dispatch(
        saveDeviceTokenActionInitiate({
          token: token
        })
      );

    }


  } catch(error){

    console.log(
      "Notification Error",
      error
    );

  }

};



export const listenForMessages = () => {

  const unsubscribe = onMessage(
    messaging,
    (payload) => {

      console.log(
        "Foreground notification:",
        payload
      );


      if(
        Notification.permission === "granted" &&
        payload?.notification
      ){

        new Notification(
          payload.notification.title,
          {
            body: payload.notification.body,
            icon: "/hr.png",
          }
        );

      }

    }
  );


  return unsubscribe;
};