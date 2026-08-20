import { getFirebaseMessaging } from "./firebase";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:3000";

const VAPID_KEY =
  process.env.REACT_APP_FIREBASE_VAPID_KEY;






export const requestNotificationPermission = async () => {
  try {
  

    if (!VAPID_KEY) {
      // console.error(" Firebase VAPID key is missing");
      return null;
    }

    if (!("Notification" in window)) {
      // console.error(" Browser notifications are not supported");
      return null;
    }

    if (!("serviceWorker" in navigator)) {
      // console.error("Service Worker is not supported");
      return null;
    }


    let permission = Notification.permission;

    // console.log("Current permission:", permission);

    if (permission !== "granted") {
      permission = await Notification.requestPermission();
    }

    // console.log("Final permission:", permission);

    if (permission !== "granted") {
      // console.error(" Notification permission denied");
      return null;
    }

    // console.log("Notification permission granted");

   

    const messaging = await getFirebaseMessaging();

    if (!messaging) {
      // console.error(" Firebase Messaging unavailable");
      return null;
    }


   

    const registration =
      await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );

    // console.log(
    //   "Firebase Service Worker registered:",
    //   registration
    // );

    const readyRegistration =
      await navigator.serviceWorker.ready;

    // console.log(
    //   " Service Worker ready:",
    //   readyRegistration
    // );

   
    const { getToken } =
      await import("firebase/messaging");

    
    const token = await getToken(
      messaging,
      {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: readyRegistration,
      }
    );

    // console.log(" FCM TOKEN:", token);

    if (!token) {
      // console.error(" FCM TOKEN EMPTY");
      return null;
    }

    // console.log(" FCM TOKEN GENERATED");

   

    const authToken =
      localStorage.getItem("token");

    console.log(
      "AUTH TOKEN EXISTS:",
      !!authToken
    );

    if (!authToken) {
      // console.warn(
      //   " JWT token missing. Token not saved."
      // );

      return token;
    }

    

    // console.log(
    //   " Saving FCM token to backend..."
    // );

    // console.log(
    //   "Endpoint:",
    //   `${API_URL}/api/device_tokens`
    // );

    const response = await fetch(
      `${API_URL}/api/device_tokens`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization:
            `Bearer ${authToken}`,
        },

        body: JSON.stringify({
          token: token,
        }),
      }
    );

    // console.log(
    //   "Device token status:",
    //   response.status
    // );

    const responseText =
      await response.text();

    // console.log(
    //   "Device token response:",
    //   responseText
    // );

    if (!response.ok) {
      throw new Error(
        `Device token API failed: ${response.status}`
      );
    }

    // console.log(
    //   "================================="
    // );

    // console.log(
    //   " FCM TOKEN SAVED SUCCESSFULLY"
    // );

    // console.log(
    //   "================================="
    // );

    return token;

  } catch (error) {

   

    // console.error(
    //   " FCM TOKEN ERROR:",
    //   error
    // );

    // console.error(
    //   "MESSAGE:",
    //   error?.message
    // );

    // console.error(
    //   "CODE:",
    //   error?.code
    // );

 

    return null;
  }
};




export const listenForForegroundNotifications =
  async (callback) => {

    try {

      // console.log(
      //   " Setting up foreground FCM listener..."
      // );

      const messaging =
        await getFirebaseMessaging();

      if (!messaging) {
        // console.error(
        //   " Messaging unavailable for foreground listener"
        // );

        return () => {};
      }

      const { onMessage } =
        await import("firebase/messaging");

      const unsubscribe =
        onMessage(
          messaging,
          (payload) => {

            // console.log(
            //   " FOREGROUND FCM MESSAGE RECEIVED "
            // );

            // console.log(
            //   "FCM PAYLOAD:",
            //   payload
            // );

            const notification =
              payload?.notification || {};

            const title =
              notification.title ||
              payload?.data?.title ||
              "Notification";

            const message =
              notification.body ||
              payload?.data?.message ||
              "";

            // console.log(
            //   "Notification title:",
            //   title
            // );

            // console.log(
            //   "Notification message:",
            //   message
            // );

            // Send data to AppBar
            if (callback) {
              callback({
                title,
                message,
                payload,
              });
            }

          

            // if (
            //   Notification.permission ===
            //   "granted"
            // ) {

            //   new Notification(
            //     title,
            //     {
            //       body: message,
            //       icon: "/logo192.png",
            //     }
            //   );

            // }

          }
        );

      // console.log(
      //   " Foreground FCM listener ready"
      // );

      return unsubscribe;

    } catch (error) {

      // console.error(
      //   " Foreground FCM listener error:",
      //   error
      // );

      return () => {};
    }
  };