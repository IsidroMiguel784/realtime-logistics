const validatePackageMiddleware = (req, res, next) => {

    const { id, status } = req.body;

    if (id === undefined || status === undefined) {
        return res.status(400).json({
            message: "id y status son obligatorios"
        });
    }

    if (typeof id !== "number") {
        return res.status(400).json({
            message: "id debe ser un número"
        });
    }

    if (typeof status !== "string") {
        return res.status(400).json({
            message: "status debe ser un string"
        });
    }

    next();
    
};

module.exports = validatePackageMiddleware;