module.exports = factory

function factory({ model, Schema }) {
  const exports = User

  function User() {
    return model('users', userSchema)
  }

  const userSchema = new Schema({
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 1
    },
    name: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 1
    },
    password: {
      type: String,
      minLength: 5
    },
    avatar: {
      type: String
    },
    balance: {
      type: Number,
      default: 10
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  })

  return exports
}
