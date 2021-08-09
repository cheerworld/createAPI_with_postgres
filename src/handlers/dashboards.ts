import express, { Request, Response } from "express";

import { DashboardQueries } from "../services/dashboard";

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders();
  res.json(products);
};

const usersWithOrders = async (_req: Request, res: Response) => {
  const users = await dashboard.usersWithOrders();
  res.json(users);
};

const dashboard_routes = (app: express.Application) => {
  app.get("/products_in_orders", productsInOrders);
  app.get("/users_with_orders", usersWithOrders);
};

export default dashboard_routes;
