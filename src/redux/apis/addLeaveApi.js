import API from "../../API/API";

const api = new API();

export const saveLeaveData = async (newLeave) => {
  try {

    const response = await api.post("leaves", {
      leave: newLeave
    });

    return response.data;

  } catch (error) {

    console.log(
      "Error in saveLeaveData:",
      error.response?.data
    );

    throw error;
  }
};