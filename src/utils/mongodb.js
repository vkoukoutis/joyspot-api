import mongoose from 'mongoose';

export default mongoURI => {
  mongoose.Promise = global.Promise;
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .catch(err => console.error(err));
};
