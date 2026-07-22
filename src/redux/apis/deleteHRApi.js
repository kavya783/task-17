import API from "../../API/API";

const api = new API();
export const deleteHRData = async (id) => {
  try {
    const response = await api.delete(`hrs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};