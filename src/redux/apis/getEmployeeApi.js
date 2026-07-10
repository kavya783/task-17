import API from "../../API/API";

const api = new API();

export const fetchEmployeeData = async () => {
  try {
    const response = await api.get("users");

    return response.data;
  } catch (error) {
    throw error;
  }
};