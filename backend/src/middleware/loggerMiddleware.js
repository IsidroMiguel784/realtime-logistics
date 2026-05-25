const loggerMiddleware = (req, res, next) => {

    const currentDate = new Date().toISOString();

    console.log(
        `[${currentDate}] ${req.method} ${req.originalUrl}`
    );

    next();

};

module.exports = loggerMiddleware;