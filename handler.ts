/* tslint:disable */
import { UserFollowerHandler } from "./handlers/UserFollowerHandler";
import jwt from "jsonwebtoken";
import { AuthHandler } from "handlers/AuthHandler";
import { APIGatewayProxyResult, APIGatewayProxyHandler } from "aws-lambda";
import Response from "utils/Response";
import { Container } from "container";
import { DbHandler } from "handlers/DbHandler";
import { UserHandler } from "handlers/UserHandler";
import { generatePolicy } from "utils/Helper";

async function putProfile({ inputs, user }): Promise<APIGatewayProxyResult> {
  const profile = await UserHandler.get({ uuid: user.uuid });
  return Response.success(await UserHandler.update(inputs, profile));
}

async function migrate({ inputs }): Promise<APIGatewayProxyResult> {
  const db = new DbHandler(inputs);
  db.migrate();
  return Response.onContent();
}

async function login({ inputs }): Promise<APIGatewayProxyResult> {
  return Response.success(await AuthHandler.login(inputs));
}

async function signup({ inputs }): Promise<APIGatewayProxyResult> {
  return Response.success(await AuthHandler.signup(inputs));
}

export const auth = async (event, context, callback): Promise<any> => {
  // eslint-disable-next-line
  console.log(context);
  if (!event.authorizationToken) {
    return callback("Unauthorized");
  }

  const tokenParts = event.authorizationToken.split(" ");
  const tokenValue = tokenParts[1];

  if (!(tokenParts[0].toLowerCase() === "bearer" && tokenValue)) {
    return callback("Unauthorized");
  }

  const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
  return callback(null, generatePolicy(decoded, "Allow", event.methodArn));
};

const map = {
  ["/auth/signup"]: signup,
  ["/auth/login"]: login,
  ["/migrate"]: migrate,
  ["/profile"]: putProfile,
};

export const responder: APIGatewayProxyHandler = async (event, context) => {
  const callback = map[event.path];
  return Container.apigw({ event, context, callback });
};

export const getUserResponder: APIGatewayProxyHandler = async (
  event,
  context
) => {
  const callback = async ({ inputs }) =>
    Response.success(await UserHandler.get(inputs));

  return Container.apigw({ event, context, callback });
};

export const toogleFollowingResponder: APIGatewayProxyHandler = async (
  event,
  context
) => {
  const callback = async ({ inputs, user }): Promise<APIGatewayProxyResult> =>
    Response.success(await UserFollowerHandler.toggle(inputs, user));

  return Container.apigw({ event, context, callback });
};
