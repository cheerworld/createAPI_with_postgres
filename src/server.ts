import express, { Request, Response } from "express";
import rare_plants_routes from "./handlers/rare_plants";
import users_routes from "./handlers/users";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

rare_plants_routes(app);
users_routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
