import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";

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
    const jsonfy = res.json(newUser);
    res.send(jsonfy);
  } catch (err) {
    res.status(400);
    res.json(err);
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
    const jsonfy = res.json(authUser);
    res.send(jsonfy);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const users_routes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
  app.delete("/users/:id", remove);
  app.post("/users/authenticate", authenticate);
};

export default users_routes;
