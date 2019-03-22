export const Query = {
  me(parent, args, ctx, info) {
    if (!ctx.req.userId) {
      return null;
    }

    return ctx.User.findById(ctx.req.userId);
  },
  users(parent, args, ctx, info) {
    return [
      {
        id: 'ho'
      },
      {
        id: 'a'
      },
      {
        id: 'akkkdd'
      }
    ];
  }
};
