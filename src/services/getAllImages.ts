import axios from 'axios';

const getAllImages = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/images`);
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

export default getAllImages;