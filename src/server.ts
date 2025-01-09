import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import router from "./routes/router";
import db from "./config/db";

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.blue('Conexión Exitosa a la BD'))
  } catch (error) {
    console.log(error);
    console.log(colors.bgRed.white("Hubo un error al conectar a la BD"));
  }
}

connectDB();

const server = express();

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Cors Error"));
    }
  },
};

server.use(cors(corsOptions));

server.use(express.json());
server.use(morgan("dev"));

server.use("/api/products", router);
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default server;