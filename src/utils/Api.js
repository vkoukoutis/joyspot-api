import axios from 'axios';

const Api = (apiLink, apiKey) => {
  return axios.create({
    baseURL: apiLink,
    headers: {
      'X-RapidAPI-Key': apiKey
    }
  });
};

export default Api;
