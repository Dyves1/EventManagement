import axios from 'axios';
const BaseURL = import.meta.env.VITE_REACT_BASE_URL;

export const login = async (email, password) => {
  console.log(email, password)
  try {
    const response = await axios.post(`${BaseURL}/login`,
        { email, password },

        {
        headers: {
          'Content-Type': 'application/json'
        }
      }
        );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (fullNmes, email, password) => {
  try {
    const response = await axios.post(`${BaseURL}/signup`, {fullNmes, email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};