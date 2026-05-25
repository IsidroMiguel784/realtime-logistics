const packageService = require("../services/packageService");

const {
    getSocketServerInstance
} = require("../socket");

//controladores de paquetes

const getPackages = (req, res) => {
    const packages = packageService.getAllPackages();

    res.json(packages);
};

const getPackage = (req, res) => {

    const packageId = parseInt(req.params.id);

    const foundPackage = packageService.getPackageById(packageId);

    if (!foundPackage) {
        return res.status(404).json({
            message: "Paquete no encontrado"
        });
    }

    res.json(foundPackage);
};

const createPackage = (req, res) => {

    const newPackage = packageService.createPackage(req.body);

    const io = getSocketServerInstance();

    io.emit("packageCreated", newPackage);

    res.status(201).json({
        message: "Paquete creado correctamente",
        data: newPackage
    });
};

const updatePackage = (req, res) => {

    const packageId = parseInt(req.params.id);

    const updatedPackage = packageService.updatePackage(
        packageId,
        req.body
    );

    if (!updatedPackage) {
        return res.status(404).json({
            message: "Paquete no encontrado"
        });
    }

    const io = getSocketServerInstance();

    io.emit("packageUpdated", updatedPackage);

    res.json({
        message: "Paquete actualizado correctamente",
        data: updatedPackage
    });
};

const deletePackage = (req, res) => {

    const packageId = parseInt(req.params.id);

    const deleted = packageService.deletePackage(packageId);

    if (!deleted) {
        return res.status(404).json({
            message: "Paquete no encontrado"
        });
    }

    const io = getSocketServerInstance();

    io.emit("packageDeleted", {
        id: packageId
    });

    res.json({
        message: "Paquete eliminado correctamente"
    });
};

module.exports = {
    getPackages,
    getPackage,
    createPackage,
    updatePackage,
    deletePackage
};