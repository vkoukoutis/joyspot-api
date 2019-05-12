export const UserQuery = {
  me(parent, args, ctx) {
    if (!ctx.req.userId) {
      throw Error('Please signin first')
    }

    return ctx.model.User.findById(ctx.req.userId)
  },
  users(parent, args, ctx) {
    if (!ctx.req.userId) {
      throw Error('Please signin first')
    }

    return ctx.model.User.find()
  }
}
