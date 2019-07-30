module.exports = factory

function factory(axios, mongoose) {
  const exports = { Api, connectDatabase }

  function Api(endpoint) {
    return axios.create({
      baseURL: `${process.env.API_LINK}/${endpoint}`,
      headers: {
        'user-key': process.env.API_KEY
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
