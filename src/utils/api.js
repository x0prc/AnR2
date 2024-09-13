import axios from 'axios';

export const sendMessageViaAPI = async (message) => {
  try {
    const response = await axios.post('http://localhost:5000/api/send', {
      message
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message via API:', error);
  }
};
