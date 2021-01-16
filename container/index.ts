/* tslint:disable */
import Knex from "knex";
import { Model } from "objection";
import Response from "utils/Response";
import { eventBodyParser } from "../parser/eventBodyParser";
import * as KnexConfig from "./../knexfile";

export class Container {
  static async apigw({ event, callback, context }): Promise<any> {
    try {
      // eslint-disable-next-line
      console.log(context);
      Model.knex(Knex(KnexConfig.default));
      const inputs = eventBodyParser(event);
      return await callback(inputs);
    } catch (e) {
      // eslint-disable-next-line
      console.log(e);
      return Response.error({ message: e.message, stack: e.stack });
    }
  }
}
