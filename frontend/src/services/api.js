import axios from 'axios';

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${config.apiUrl}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${config.apiUrl}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export { registerUser, loginUser };
