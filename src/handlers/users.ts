import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    const jsonfy = res.json(users);
    res.send(jsonfy);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.body.id));
    const jsonfy = res.json(user);
    res.send(jsonfy);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    password_digest: req.body.password_digest,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as unknown as string
    );
    const jsonfy = res.json(token);
    res.send(jsonfy);
  } catch (err) {
    res.status(400);
    res.json(err + user);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const deleted_user = await store.delete(parseInt(req.body.id));
    const jsonfy = res.json(deleted_user);
    res.send(jsonfy);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const authUser = await store.authenticate(
      req.body.username,
      req.body.password_digest
    );
    const token = jwt.sign(
      { user: authUser },
      process.env.TOKEN_SECRET as unknown as string
    );

    const jsonfy = res.json(token);
    res.send(jsonfy);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const verifyAuthToken = (
  req: Request,
  res: Response,
  next: express.NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader);
    const token = (authorizationHeader as string).split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (error) {
    res.status(401);
    res.json(`Access denied, invalid token ${error}`);
  }
};

const users_routes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", show);
  app.post("/users", create);
  app.delete("/users/:id", verifyAuthToken, remove);
  app.post("/users/authenticate", authenticate);
};

export default users_routes;
