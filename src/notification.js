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


  

    

      const registration =
        await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );


      
      const readyRegistration =
        await navigator.serviceWorker.ready;


     


     

      const token =
        await getToken(
          messaging,
          {
            vapidKey: VAPID_KEY,

            serviceWorkerRegistration:
              readyRegistration,
          }
        );



      if (!token) {

        
        return null;
      }


      



      const authToken =
        localStorage.getItem("token");


      

      if (!authToken) {

        

        return token;
      }




      


      const deviceTokenEndpoint =
        `${API_URL}/device_tokens`;


     

     

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


      


      const responseText =
        await response.text();


      


      if (!response.ok) {

        throw new Error(
          `Device token API failed: ${response.status}`
        );
      }


     

      // console.log(
      //   "FCM TOKEN SAVED SUCCESSFULLY"
      // );

     


      return token;


    } catch (error) {


    
      console.error(
        "Error code:",
        error?.code
      );


      return null;
    }
  };




export const listenForForegroundNotifications =
  async (callback) => {

    try {

    


     
      const messaging =
        await getFirebaseMessaging();


      if (!messaging) {

       
        return () => {};
      }


    

      const unsubscribe =
        onMessage(
          messaging,
          (payload) => {

           

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


           

            if (callback) {

              callback({
                title,
                message,
                payload,
              });

            }


        

            if (
              "Notification" in window &&
              Notification.permission ===
                "granted"
            ) {

             

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


            }

          }
        );


      


      return unsubscribe;


    } catch (error) {

     

      return () => {};
    }
  };