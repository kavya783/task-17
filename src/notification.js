import { saveDeviceTokenActionInitiate } from "./redux/actions/deviceTokenAction";

export const requestNotificationPermission = async (
  dispatch,
  userId = null,
  companyId = null
) => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied");
      return;
    }

    const { getToken } = await import("firebase/messaging");
    const { messaging } = await import("./firebase");

    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
    });

    console.log("FCM TOKEN:", token);

    if (token) {
      await dispatch(
        saveDeviceTokenActionInitiate({
          token,
          user_id: userId,
          company_id: companyId,
        })
      );
    }
  } catch (error) {
    console.log("Notification Error", error);
  }
};
export const listenForMessages = async () => {
  try {
    const { onMessage } = await import("firebase/messaging");
    const { messaging } = await import("./firebase");

    const unsubscribe = onMessage(
      messaging,
      (payload) => {
        console.log("Foreground notification:", payload);

        if (
          Notification.permission === "granted" &&
          payload?.notification
        ) {
          new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: "/hr.png",
          });
        }
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error("Failed to initialize Firebase messaging:", error);
    return undefined;
  }
};