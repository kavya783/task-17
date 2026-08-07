import API from "../../API/API";

const api = new API();

export const loginUser = async (data) => {
  try {
    const response = await api.post("login", data);

    return response.data;
  } catch (error) {
    throw error;
  }
};