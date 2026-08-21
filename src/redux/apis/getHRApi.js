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
    hrCache = response.dataimport API from "../../API/API";

const api = new API();

export const fetchHRData = async () => {
  try {
    const response = await api.get("hrs");

    return response.data;
  } catch (error) {
    throw error;
  }
};;

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const clearHRCache = () => {
  hrCache = null;
};