import API from "../../API/API";

const api = new API();



export const fetchHRData = async () => {
  try {
    const response = await api.get("hrs");
    return response.data;
  } catch (error) {
    throw error;
  }
};
