import { User } from './../models/User';

export class UserHandler {
  static async create(inputs: Record<string, any>) {
    const query = User.query();
    const user = await query.findOne({ username: inputs.username });
    if (user) throw new Error('User already exists');

    return await User.query().insertAndFetch({ ...inputs });
  }

  static async get(inputs: Record<string, any>) {
    const query = User.query();
    const user = await query.findOne({ ...inputs });
    if (!user) throw new Error('User not found');

    return user;
  }

  static async update(inputs: Record<string, any>, user: Record<string, any>) {
    const query = User.query();
    await query.update({ ...inputs }).where({ uuid: user.uuid });
    return true;
  }
}
