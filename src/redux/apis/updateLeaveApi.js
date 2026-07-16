import API from "../../API/API";

const api = new API();

export const updateLeaveData = async (leaveData, id) => {
  try {
    const response = await api.put(`leaves/${id}`, {
      leave: leaveData,
    });

    return response.data;
  } catch (error) {
    // console.log("Error in updateLeaveData:", error);
    throw error;
  }
};