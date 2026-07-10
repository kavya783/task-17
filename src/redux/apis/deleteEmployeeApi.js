import API from "../../API/API";

const api = new API();

export const deleteEmployeeData = async (id) => {
  try {
    const response = await api.delete(`users/${id}`);

    return response.data;
  } catch (error) {
    console.log("Error in deleteEmployeeData:", error);
    throw error;
  }
};