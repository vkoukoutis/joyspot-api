export const Query = {
  me(parent, args, ctx) {
    if (!ctx.req.userId) {
      return null;
    }

    return ctx.model.User.findById(ctx.req.userId);
  },
  users(parent, args, ctx) {
    if (!ctx.req.userId) {
      return null;
    }

    return ctx.model.User.find();
  },
  products(parent, args, ctx) {
    if (!ctx.req.userId) {
      return null;
    }

    return ctx.model.Product.find();
  },
  product(parent, args, ctx) {
    if (!ctx.req.userId) {
      return null;
    }

    if (!args.id) {
      throw Error('Please give a product id');
    }

    return ctx.model.Product.findById(args.id);
  }
};
