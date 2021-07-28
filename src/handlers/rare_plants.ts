import express, { Request, Response } from "express";
import { Plant, RarePlantStore } from "../models/rare_plant";

const store = new RarePlantStore();

const index = async (_req: Request, res: Response) => {
  try {
    const rare_plants = await store.index();
    const jsonfy = res.json(rare_plants);
    res.send(jsonfy);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const rare_plant = await store.show(parseInt(req.params.id));
    const jsonfy = res.json(rare_plant);
    res.send(jsonfy);
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
    const jsonfy = res.json(rare_plant);
    res.send(jsonfy);
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
    const jsonfy = res.json(rare_plant);
    res.send(jsonfy);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const deleted_plant = await store.delete(parseInt(req.params.id));
    const jsonfy = res.json(deleted_plant);
    res.send(jsonfy);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const rare_plants_routes = (app: express.Application) => {
  app.get("/rare_plants", index);
  app.get("/rare_plants/:id", show);
  app.post("/rare_plants", create);
  app.put("/rare_plants/:id", update);
  app.delete("/rare_plants/:id", remove);
};

export default rare_plants_routes;
