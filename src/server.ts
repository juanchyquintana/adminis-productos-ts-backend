import express from 'express';
import colors from 'colors'
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import router from './routes/router';
import db from './config/db';

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.blue('Conexión Exitosa a la BD'))
    } catch (error) {
        console.log(error);
        console.log(colors.bgRed.white('Hubo un error al conectar a la BD'))
    }
}

connectDB();

const server = express();

server.use(express.json())
server.use('/api/products', router)

server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default server;