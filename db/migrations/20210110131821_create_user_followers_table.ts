import * as Knex from 'knex';
import { timestamps } from '../Helpers';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_followers', function (table) {
    table.bigIncrements('id');
    table.bigInteger('user_id').index();
    table.bigInteger('profile_id').index();
    table.specificType('status', 'tinyint(1)').index();
    timestamps(knex, table);
    table.charset('utf8mb4');
    table.collate('utf8mb4_unicode_ci');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('user_followers');
}
