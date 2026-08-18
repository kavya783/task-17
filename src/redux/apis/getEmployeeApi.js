import API from "../../API/API";

const api = new API();

let employeeCache = null;

export const fetchEmployeeData = async () => {
  try {
    // Cache available unte API call cheyyakunda return
    if (employeeCache) {
      return employeeCache;
    }

    const response = await api.get("users");

    // Store response
    employeeCache = response.data;

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const clearEmployeeCache = () => {
  employeeCache = null;
};