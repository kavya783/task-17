import API from "../../API/API";

const api = new API();

// API response cache
const leaveCache = new Map();

export const fetchLeaveData = async (appliedBy) => {
  try {
    const cacheKey = appliedBy || "all";

    // Already fetched data unte API call cheyyakunda cache nunchi return
    if (leaveCache.has(cacheKey)) {
      return leaveCache.get(cacheKey);
    }

    const url = appliedBy
      ? `leaves?applied_by=${encodeURIComponent(appliedBy)}`
      : "leaves";

    const response = await api.get(url);

    // Store response in cache
    leaveCache.set(cacheKey, response.data);

    return response.data;

  } catch (error) {
    console.error("LEAVE API ERROR:", error);
    throw error;
  }
};

// Cache clear after create/update/delete
export const clearLeaveCache = () => {
  leaveCache.clear();
};