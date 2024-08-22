import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec,swaggerUiOptions } from "./config/swagger";
import cors, {CorsOptions} from 'cors';
import morgan from 'morgan';

//Conectar a base de datos

export async function connectDB(){
    try {
        await db.authenticate();
        db.sync();
    } catch (error) {
        console.log(error);
        console.log(colors.bgRed.white('Error en la conexión a la base de datos'));
    }
}
connectDB();
//instancia de express
const server = express();
//permitir conexiones
const corsOptions:CorsOptions = {
    /*origin: (origin, callback) => {
        if (process.env.LIST_WHITELIST.split(',').includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }*/
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['X-Total-Count', 'Link'],
    credentials: true,
}
server.use(cors(corsOptions));
//leer datos
server.use(express.json());
//Morgan
server.use(morgan('dev'));
//Docs
server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,swaggerUiOptions));

server.use('/api', router);

export default server;
