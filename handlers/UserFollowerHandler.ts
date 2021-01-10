import { User } from './../models/User';
import { UserFollower } from './../models/UserFollower';

export class UserFollowerHandler {
  static async toggle(inputs: Record<string, any>, user: Record<string, any>) {
    console.log(inputs, user);
    const userProfile = await User.query().findOne({ uuid: user.uuid });
    console.log(userProfile);
    const profile = await User.query().findOne({ username: inputs.username });
    console.log(profile);

    if (profile['id'] === userProfile['id'])
      throw new Error('User cannot own profile');

    const follower = await UserFollower.query().findOne({
      userId: userProfile['id'],
      profileId: profile['id'],
    });

    if (follower) {
      await UserFollower.query().where(follower).delete();
      return false;
    }

    const following = await UserFollower.query().insert({
      userId: userProfile['id'],
      profileId: profile['id'],
    });

    return true;
  }
}
