import API from "../../API/API";

const api = new API();


export const fetchNotificationData = async () => {
  try {

    const response = await api.get("notifications");

    return response.data;

  } catch (error) {

    throw error;

  }
};