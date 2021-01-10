import { Model } from 'objection';

export class User extends Model {
  static tableName = 'users';

  static relationMappings = {
    followers: {
      relation: Model.ManyToManyRelation,
      modelClass: 'User',
      join: {
        from: 'users.id',
        through: {
          from: 'userFollowers.profileId',
          to: 'userFollowers.userId',
        },
        to: 'users.id',
      },
    },
    followings: {
      relation: Model.ManyToManyRelation,
      modelClass: 'User',
      join: {
        from: 'users.id',
        through: {
          from: 'user_followers.userId',
          to: 'user_followers.profileId',
        },
        to: 'users.id',
      },
    },
  };
}
