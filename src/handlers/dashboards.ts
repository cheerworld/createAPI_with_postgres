import express, { Request, Response } from "express";

import { DashboardQueries } from "../services/dashboard";

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders();
  res.json(products);
};

const dashboard_routes = (app: express.Application) => {
  app.get("/products_in_orders", productsInOrders);
};

export default dashboard_routes;
