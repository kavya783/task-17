import API from "../../API/API";

const api = new API();

export const saveDeviceTokenApi = async (data) => {
  try {

    const response = await api.post(
      "device_tokens",
      data
    );

    return response.data;

  } catch(error){

    throw error;

  }
};