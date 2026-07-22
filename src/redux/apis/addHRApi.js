import API from "../../API/API";

const api = new API();

export const saveHRData = async (hr) => {
  try {

    const response = await api.post(
      "users",
      hr,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response.data;

  } catch (error) {
    throw error;
  }
};