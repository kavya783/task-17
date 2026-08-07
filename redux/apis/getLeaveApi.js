import API from "../../API/API";

const api = new API();

export const fetchLeaveData = async (appliedBy) => {
  try {
    const url = appliedBy ? `leaves?applied_by=${encodeURIComponent(appliedBy)}` : "leaves";
    const response = await api.get(url);

    return response.data;
  } catch (error) {
    throw error;
  }
};