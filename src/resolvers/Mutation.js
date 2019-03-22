import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const Mutation = {
  async signup(parent, args, ctx, info) {
    if (!args.email || !args.name || !args.password) {
      throw Error('Please fill all fields.');
    }

    //Hash Password
    const password = await bcrypt.hash(args.password, 10);
    // Create User
    const user = await new ctx.User({ ...args, password }).save();
    //Create & set token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    ctx.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 1
    });

    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    if (!email || !password) {
      throw Error('Please fill all fields.');
    }

    //Check if there is a user with that email
    const user = await ctx.User.findOne({ email });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    //Check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password!');
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    ctx.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 1
    });

    return user;
  },
  async updateUser(parent, { email, name, avatar }, ctx, info) {
    const userId = getUser(ctx);

    if (!userId) {
      throw Error('Please signin first');
    }

    const user = await ctx.db.mutation.updateUser(
      {
        where: { id: userId },
        data: { email, name, avatar }
      },
      info
    );

    return user;
  }
};
