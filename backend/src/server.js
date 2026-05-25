const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const {
    setSocketServerInstance
} = require("./socket");

const packageRoutes = require("./routes/packageRoutes");

const loggerMiddleware = require("./middleware/loggerMiddleware");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");

const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use("/packages", packageRoutes);

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

app.use(errorHandlerMiddleware);

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

setSocketServerInstance(io);

io.on("connection", (socket) => {

    console.log(`Cliente conectado: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });

});

httpServer.listen(3000, () => {
    console.log("Servidor ejecutándose en puerto 3000");
});