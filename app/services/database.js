import mongoose from 'mongoose'

export default uri => {
  mongoose.Promise = global.Promise
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .catch(err => console.error(err))
}
