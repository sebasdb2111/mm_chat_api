import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes/index";
import * as errorHandler from "errorhandler";

const app: express.Express = express();

createConnection()
  .then(async connection => {
    app.use(cors());
    app.use(helmet());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.hidePoweredBy());
    app.use(helmet.frameguard({ action: "deny" }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(errorHandler());

    app.use("/api", routes);

    app.set("port", 3000);
    app.listen(app.get("port"), () => {
      console.log(
        `  App is running at http://localhost:${app.get("port")} in ${app.get(
          "env"
        )} mode`
      );
      console.log("  Press CTRL-C to stop\n");
    });
  })
  .catch(error => console.log(error));
