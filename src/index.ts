import colors from 'colors'
import server from "./server";

const port = process.env.PORT || 3000;

server.listen(4000, () => {
    console.log(colors.cyan.bold(`REST API en el puerto ${port}`))
})