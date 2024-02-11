import axios from "axios";
import { BASE_URL } from "../../config";

export const signup = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/register`, {
      name,
      email,
      password,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
export const signin = async ({ email, password }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/user/login`, {
      email,
      password,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
