import axios from "axios";
import {
  getAuthToken,
  getUserData,
  isServiceSelected,
  isThemeSelected,
} from "./axios_helpers";

export const axiosPost = async (url, data) => {
  try {
    let { data: response } = await axios.post(
      process.env.REACT_APP_BACKEND_URL + url,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const axiosAuthPost = async (url, data) => {
  try {
    const Authtoken = getAuthToken();
    const user = getUserData();
    if (Authtoken) {
      let { data: response } = await axios.post(
        process.env.REACT_APP_BACKEND_URL + url,
        {
          user_id: user.user_id,
          ...data,
        },
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      return response;
    } else {
      return "Authorization Error!";
    }
  } catch (error) {
    return error;
  }
};

export const axiosAuthGet = async (url, data) => {
  try {
    const Authtoken = getAuthToken();
    if (Authtoken) {
      let { data: response } = await axios.get(
        process.env.REACT_APP_BACKEND_URL + url,
        {
          headers: {
            Authorization: Authtoken,
          },
          params: {
            ...data,
          },
        }
      );
      return response;
    } else {
      return "Authorization Error!";
    }
  } catch (error) {
    console.log(error, "Network Error");
    return error;
  }
};

export const axiosAuthDelete = async (url, data) => {
  try {
    const Authtoken = getAuthToken();
    const user = getUserData();
    if (Authtoken) {
      let { data: response } = await axios.delete(
        process.env.REACT_APP_BACKEND_URL + url,
        {
          headers: {
            Authorization: Authtoken,
          },
          data: {
            user_id: user.user_id,
            ...data,
          },
        }
      );
      return response;
    } else {
      return "Authorization Error!";
    }
  } catch (error) {
    return error;
  }
};
