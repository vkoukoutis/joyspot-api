import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const User = {
  async signup(parent, args, ctx) {
    if (!args.email || !args.name || !args.password) {
      throw Error('Please fill all fields.');
    }

    //Hash Password
    const password = await bcrypt.hash(args.password, 10);
    // Create User
    const user = await new ctx.model.User({ ...args, password }).save();
    //Create & set token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    ctx.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 1
    });

    return user;
  },
  async signin(parent, { email, password }, ctx) {
    if (!email || !password) {
      throw Error('Please fill all fields.');
    }

    //Check if there is a user with that email
    const user = await ctx.model.User.findOne({ email });
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
  async updateUser(parent, { email, name, avatar }, ctx) {
    if (!ctx.req.userId) {
      throw Error('Please signin first');
    }

    const user = await ctx.model.User.findOneAndUpdate(
      { _id: ctx.req.userId },
      { $set: { email, name, avatar } },
      { returnNewDocument: true }
    );

    return user;
  }
};
