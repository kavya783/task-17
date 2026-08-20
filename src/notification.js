import { getFirebaseMessaging } from "./firebase";

import {
  getToken,
  onMessage,
} from "firebase/messaging";



const API_URL = (
  process.env.REACT_APP_API_URL || ""
).replace(/\/+$/, "");


const VAPID_KEY =
  process.env.REACT_APP_FIREBASE_VAPID_KEY;



// console.log(
//   " NEW NOTIFICATION FILE LOADED "
// );

// console.log(
//   "ENV API URL:",
//   process.env.REACT_APP_API_URL
// );

// console.log(
//   "FINAL API URL:",
//   API_URL
// );

// console.log(
//   "DEVICE TOKEN URL:",
//   `${API_URL}/device_tokens`
// );




export const requestNotificationPermission =
  async () => {

    try {

    

      // console.log(
      //   " FCM STARTED"
      // );

    

      console.log(
        "VAPID KEY EXISTS:",
        !!VAPID_KEY
      );

      if (!VAPID_KEY) {

        // console.error(
        //   " Firebase VAPID key is missing"
        // );

        return null;
      }



      // console.log(
      //   "API URL:",
      //   API_URL
      // );

      if (!API_URL) {

        // console.error(
        //   " REACT_APP_API_URL is missing"
        // );

        return null;
      }



      if (!("Notification" in window)) {

        // console.error(
        //   " Browser notifications are not supported"
        // );

        return null;
      }


     

      if (!("serviceWorker" in navigator)) {

        // console.error(
        //   " Service Worker is not supported"
        // );

        return null;
      }


      // console.log(
      //   " Browser supports notifications"
      // );


      // console.log(
      //   " Getting Firebase Messaging..."
      // );

      const messaging =
        await getFirebaseMessaging();


      if (!messaging) {

        // console.error(
        //   " Firebase Messaging unavailable"
        // );

        return null;
      }


     

      let permission =
        Notification.permission;


      console.log(
        "Current notification permission:",
        permission
      );


      if (permission !== "granted") {

        // console.log(
        //   " Requesting notification permission..."
        // );

        permission =
          await Notification.requestPermission();
      }


      // console.log(
      //   "FCM permission:",
      //   permission
      // );


      if (permission !== "granted") {

        console.error(
          " Notification permission denied"
        );

        return null;
      }


      console.log(
        " Notification permission granted"
      );


  

      console.log(
        " Registering Firebase Service Worker..."
      );


      const registration =
        await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );


      console.log(
        "✅ Service Worker registered successfully",
        registration
      );


      const readyRegistration =
        await navigator.serviceWorker.ready;


      console.log(
        "✅ Service Worker is ready:",
        readyRegistration
      );



      console.log(
        " Generating FCM token..."
      );


      const token =
        await getToken(
          messaging,
          {
            vapidKey: VAPID_KEY,

            serviceWorkerRegistration:
              readyRegistration,
          }
        );


      console.log(
        "FCM TOKEN:",
        token
      );


      if (!token) {

        console.error(
          "❌ FCM TOKEN IS EMPTY"
        );

        return null;
      }


      console.log(
        "✅ FCM TOKEN GENERATED SUCCESSFULLY"
      );



      const authToken =
        localStorage.getItem("token");


      console.log(
        "AUTH TOKEN EXISTS:",
        !!authToken
      );


      if (!authToken) {

        console.warn(
          " JWT token missing"
        );

        return token;
      }




      console.log(
        " Saving FCM token to backend..."
      );


      const deviceTokenEndpoint =
        `${API_URL}/device_tokens`;


      console.log(
        "================================="
      );

      console.log(
        "DEVICE TOKEN ENDPOINT:"
      );

      console.log(
        deviceTokenEndpoint
      );

      console.log(
        "================================="
      );


      const response =
        await fetch(
          deviceTokenEndpoint,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${authToken}`,
            },

            body:
              JSON.stringify({
                token: token,
              }),
          }
        );


      console.log(
        "device_tokens status:",
        response.status
      );


      const responseText =
        await response.text();


      console.log(
        "device_tokens raw response:",
        responseText
      );


      if (!response.ok) {

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




export const listenForForegroundNotifications =
  async (callback) => {

    try {

      console.log(
        "🔥 Setting up foreground FCM listener..."
      );


      /* =====================================================
         GET FIREBASE MESSAGING
      ===================================================== */

      const messaging =
        await getFirebaseMessaging();


      if (!messaging) {

        console.error(
          "❌ Firebase Messaging unavailable"
        );

        return () => {};
      }


      console.log(
        "✅ Firebase Messaging available for foreground"
      );


      /* =====================================================
         ON MESSAGE
      ===================================================== */

      const unsubscribe =
        onMessage(
          messaging,
          (payload) => {

            console.log(
              "🔥🔥 FOREGROUND FCM MESSAGE RECEIVED 🔥🔥"
            );


            console.log(
              "FCM PAYLOAD:",
              payload
            );


            /* =================================================
               GET NOTIFICATION DATA
            ================================================= */

            const notification =
              payload?.notification || {};


            const title =
              notification.title ||
              payload?.data?.title ||
              "HR Portal";


            const message =
              notification.body ||
              payload?.data?.body ||
              payload?.data?.message ||
              "You have a new notification.";


            console.log(
              "Notification title:",
              title
            );


            console.log(
              "Notification message:",
              message
            );


            /* =================================================
               SEND TO APPBAR
            ================================================= */

            if (callback) {

              callback({
                title,
                message,
                payload,
              });

            }


            /* =================================================
               BROWSER PUSH
            ================================================= */

            if (
              "Notification" in window &&
              Notification.permission ===
                "granted"
            ) {

              console.log(
                "🔔 Showing browser notification..."
              );


              const browserNotification =
                new Notification(
                  title,
                  {
                    body: message,

                    icon: "/hr.png",

                    data:
                      payload?.data || {},
                  }
                );


              browserNotification.onclick =
                () => {

                  window.focus();

                  browserNotification.close();

                };


            } else {

              console.warn(
                "⚠️ Browser notification permission is not granted"
              );

            }

          }
        );


      console.log(
        "✅ Foreground FCM listener ready"
      );


      return unsubscribe;


    } catch (error) {

      console.error(
        "❌ Foreground FCM listener error:",
        error
      );


      return () => {};
    }
  };