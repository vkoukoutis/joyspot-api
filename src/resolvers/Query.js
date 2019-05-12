export const Query = {
  me(parent, args, ctx) {
    if (!ctx.req.userId) {
      throw Error('Please signin first');
    }

    return ctx.model.User.findById(ctx.req.userId);
  },
  users(parent, args, ctx) {
    if (!ctx.req.userId) {
      throw Error('Please signin first');
    }

    return ctx.model.User.find();
  },
  products(parent, args, ctx) {
    if (!ctx.req.userId) {
      throw Error('Please signin first');
    }

    return ctx.model.Product.find();
  },
  product(parent, args, ctx) {
    console.log(ctx.req.userId);
    if (!ctx.req.userId) {
      throw Error('Please signin first');
    }

    if (!args.id) {
      throw Error('Please give a product id');
    }

    return ctx.model.Product.findById(args.id);
  }
};
