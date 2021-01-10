import { Model } from 'objection';

export class UserFollower extends Model {
  static tableName = 'user_followers';

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'User',
      join: {
        from: 'user_followers.userId',
        to: 'users.id',
      },
    },
    profile: {
      relation: Model.BelongsToOneRelation,
      modelClass: 'User',
      join: {
        from: 'user_followers.profileId',
        to: 'users.id',
      },
    },
  };
}
