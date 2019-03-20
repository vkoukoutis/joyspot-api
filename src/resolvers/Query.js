export const Query = {
  me(parent, args, ctx, info) {
    return {
      id: 'hi'
    };
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
