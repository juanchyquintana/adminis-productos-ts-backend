import express from 'express';
import colors from 'colors'
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

server.get('/api', (req, res) => {
    res.json({ msg: "Desde API"})
})

export default server;