import API from "../../API/API";

const api = new API();

export const updateEmployeeData = async (employeeData, id) => {
  try {
    const response = await api.put(`users/${id}`, employeeData);

    return response.data;
  } catch (error) {
    console.log("Error in updateEmployeeData:", error);
    throw error;
  }
};