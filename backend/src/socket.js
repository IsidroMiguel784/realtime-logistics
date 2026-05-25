let io;

const setSocketServerInstance = (socketInstance) => {
    io = socketInstance;
};

const getSocketServerInstance = () => {
    return io;
};

module.exports = {
    setSocketServerInstance,
    getSocketServerInstance
};