// Listen for foreground notifications
export const listenForMessages = () => {

  const unsubscribe = onMessage(messaging, (payload) => {

    console.log("Foreground notification:", payload);


    if (Notification.permission === "granted" && payload?.notification) {

      new Notification(
        payload.notification.title,
        {
          body: payload.notification.body,
          icon: "/hr.png",
        }
      );

    }

  });


  return unsubscribe;
};