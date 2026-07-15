import axios from "axios";
import { BASE_URL, STATUS_CODE } from "./constants";
import { toast } from "react-toastify";

const METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

class API {
  constructor() {
    this.baseURL = BASE_URL;
  }

  async get(url, data) {
    try {
      const response = await this.api(METHOD.GET, url, data);
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      throw error;
    }
  }

  async post(url, data) {
    try {
      const response = await this.api(METHOD.POST, url, data);

      toast.success(response?.data?.message);

      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      throw error;
    }
  }

  async put(url, data) {
    try {
      const response = await this.api(METHOD.PUT, url, data);

      toast.success(response?.data?.message || "Updated Successfully");

      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      throw error;
    }
  }

  async delete(url, data) {
    try {
      const response = await this.api(METHOD.DELETE, url, data);

      toast.success(response?.data?.message || "Deleted Successfully");

      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      throw error;
    }
  }

  api(method, url, data) {
    let axiosConfig = {
      method,
      url: this.baseURL + url,
      headers: this.setHeaders(data),
    };

    if (data) {
      axiosConfig.data = data;
    }

    return axios(axiosConfig)
      .then((response) => {
        if (response.status === STATUS_CODE.INTERNAL_SERVER_ERROR) {
          toast.error("Something went wrong!");
        }

        return response;
      })
      .catch((error) => {
        console.log("API ERROR:", error);
        throw error;
      });
  }

  setHeaders(data) {
    let headers = {};

    headers["accept-language"] = "en";
    headers["Accept"] = "application/json";

    const token = localStorage.getItem("token");

    if (token) {
      headers["Authorization"] = token;
    }

    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    return headers;
  }
}

export default API;