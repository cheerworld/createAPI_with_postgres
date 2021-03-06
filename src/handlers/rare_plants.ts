import express, { Request, Response } from "express";
import { Plant, RarePlantStore } from "../models/rare_plant";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const store = new RarePlantStore();

const index = async (_req: Request, res: Response) => {
  try {
    const rare_plants = await store.index();
    res.json(rare_plants);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const rare_plant = await store.show(parseInt(req.params.id));
    res.json(rare_plant);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const plant: Plant = {
    name: req.body.name,
    type: req.body.type,
    weight: req.body.weight,
  };

  try {
    const rare_plant = await store.create(plant);
    res.json(rare_plant);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const plant: Plant = {
    name: req.body.name,
    type: req.body.type,
    weight: req.body.weight,
    id: parseInt(req.params.id),
  };
  try {
    const rare_plant = await store.update(plant);
    res.json(rare_plant);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const deleted_plant = await store.delete(parseInt(req.params.id));
    res.json(deleted_plant);
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
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret);
    next();
  } catch (error) {
    res.status(401);
    res.json(`Access denied, invalid token ${error}`);
    return;
  }
};

const rare_plants_routes = (app: express.Application) => {
  app.get("/rare_plants", index);
  app.get("/rare_plants/:id", show);
  app.post("/rare_plants", verifyAuthToken, create);
  app.put("/rare_plants/:id", verifyAuthToken, update);
  app.delete("/rare_plants/:id", verifyAuthToken, remove);
};

export default rare_plants_routes;
