module.exports = factory

function factory(axios, mongoose, { API_LINK, API_KEY }) {
  const exports = { Api, connectDatabase }

  function Api(endpoint) {
    return axios.create({
      baseURL: `${API_LINK}/${endpoint}`,
      headers: {
        'user-key': API_KEY
      }
    })
  }

  function connectDatabase(uri) {
    mongoose.Promise = global.Promise
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true
      })
      .catch(err => console.error(err))
  }

  return exports
}
