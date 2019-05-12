import axios from 'axios'

const Api = (apiLink, apiKey, endpoint) => {
  return axios.create({
    baseURL: `${apiLink}/${endpoint}`,
    headers: {
      'user-key': apiKey
    }
  })
}

export default Api
