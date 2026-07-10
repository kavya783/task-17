import API from "../../API/API";

const api = new API();

export const saveEmployeeData = async (newEmployee) => {
  try {
    const response = await api.post("users", newEmployee);
     console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error in saveEmployeeData:", error);
    throw error;
  }
};