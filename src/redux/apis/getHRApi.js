import API from "../../API/API";

const api = new API();

let hrCache = null;

export const fetchHRData = async () => {
  try {
    // Cache available unte API call cheyyakunda return
    if (hrCache) {
      return hrCache;
    }

    const response = await api.get("hrs");

    // Store response
    hrCache = response.data;

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const clearHRCache = () => {
  hrCache = null;
};