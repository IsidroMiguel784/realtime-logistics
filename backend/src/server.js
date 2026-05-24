const express = require("express");

const packageRoutes = require("./routes/packageRoutes");

const app = express();

app.use(express.json());

app.use("/packages", packageRoutes);

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en puerto 3000");
});