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

app.get("/packages/:id", (req, res) => {

    const packageId = parseInt(req.params.id);

    const foundPackage = packages.find(pkg => pkg.id === packageId);

    if (!foundPackage) {
        return res.status(404).json({           //404 -> codigo correcto cuando algo no existe
            message: "Paquete no encontrado"
        });
    }

    res.json(foundPackage);

});

app.put("/packages/:id", (req, res) => {

    const packageId = parseInt(req.params.id);

    const packageIndex = packages.findIndex(pkg => pkg.id === packageId);

    if (packageIndex === -1) { //no encontrado
        return res.status(404).json({
            message: "Paquete no encontrado"
        });
    }

    packages[packageIndex] = {
        ...packages[packageIndex], //copia todas las propiedades del paquete existente en una posicion especifica
        ...req.body //extrae todas las propiedades que vienen en la peticion HTTP
                    //... -> ENVUELVE TODO PARA CREAR UN NUEVO OBJETO
    };

    res.json({
        message: "Paquete actualizado correctamente",
        data: packages[packageIndex]
    });
})

app.delete("/packages/:id", (req, res) => {

    const packageId = parseInt(req.params.id);

    const packageIndex = packages.findIndex(pkg => pkg.id === packageId);

    if (packageIndex === -1) {
        return res.status(404).json({
            message: "Paquete no encontrado"
        });
    }

    packages.splice(packageIndex, 1); // elimina 1 elemento en esa posición

    res.json({
        message: "Paquete eliminado correctamente"
    });
});


app.listen(3000, () => {
    console.log("Servidor ejecutándose en puerto 3000");
});

