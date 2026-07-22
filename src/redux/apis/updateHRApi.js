import API from "../../API/API";

const api = new API();

export const updateHRData = async (id, hr) => {

  try {

    const response = await api.put(
      `users/${id}`,
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