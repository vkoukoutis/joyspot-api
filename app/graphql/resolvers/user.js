module.exports = factory

function factory(jwt, bcrypt) {
  const exports = {
    Mutation: { signup, signin, signout, updateUser },
    Query: { me, users }
  }

  async function signup(parent, args, ctx) {
    if (!args.email || !args.name || !args.password) {
      throw Error('Please fill all fields.')
    }

    //Hash Password
    const password = await bcrypt.hash(args.password, 10)
    // Create User
    const user = await new ctx.model.user({ ...args, password }).save()
    //Create & set token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

    ctx.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 1 // Cookie lifetime. 1day
    })

    return user
  }

  async function signin(parent, { email, password }, ctx) {
    if (!email || !password) {
      throw Error('Please fill all fields.')
    }

    //Check if there is a user with that email
    const user = await ctx.model.user.findOne({ email })
    if (!user) {
      throw new Error(`No such user found for email ${email}`)
    }
    //Check if their password is correct
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid Password!')
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)

    ctx.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 1 // Cookie lifetime. 1day
    })

    return user
  }

  function signout(parent, args, ctx, info) {
    ctx.res.clearCookie('token')
    return true
  }

  async function updateUser(parent, { email, name, avatar }, ctx) {
    if (!ctx.req.userId) {
      throw Error('Please signin first')
    }

    const user = await ctx.model.user.findOneAndUpdate(
      { _id: ctx.req.userId },
      { $set: { email, name, avatar } },
      { returnNewDocument: true }
    )

    return user
  }

  function me(parent, args, ctx) {
    if (!ctx.req.userId) {
      throw Error('Please signin first')
    }

    return ctx.model.user.findById(ctx.req.userId)
  }

  function users(parent, args, ctx) {
    if (!ctx.req.userId) {
      throw Error('Please signin first')
    }

    return ctx.model.user.find()
  }

  return exports
}
