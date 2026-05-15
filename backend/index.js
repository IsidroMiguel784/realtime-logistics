const express = require("express");

const app = express();

app.use(express.json());

const packages = [
    {
        id: 1,
        status: "IN_TRANSIT"
    },
    {
        id: 2,
        status: "DELIVERED"
    }
];

app.get("/", (req, res) => {
    res.send("API funcionando 🚀");
});

app.get("/packages", (req, res) => {

    const newPackage = req.body;

    packages.push(newPackage);

    res.status(201).json({
        message: "Paquete creado correctamente",
        data: newPackage
    });
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en puerto 3000");
});