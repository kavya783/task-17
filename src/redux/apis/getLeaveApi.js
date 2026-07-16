import API from "../../API/API";

const api = new API();

export const fetchLeaveData = async () => {
  try {
    const response = await api.get("leaves");

    return response.data;
  } catch (error) {
    // console.log("Error in fetchLeaveData:", error);
    throw error;
  }
};