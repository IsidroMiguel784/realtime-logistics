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

const getAllPackages = () => {
    return packages;
};

const getPackageById = (id) => {
    return packages.find(pkg => pkg.id === id);
};

const createPackage = (newPackage) => {
    packages.push(newPackage);
    return newPackage;
};

const updatePackage = (id, updatedData) => {

    const packageIndex = packages.findIndex(pkg => pkg.id === id);

    if (packageIndex === -1) {
        return null;
    }

    packages[packageIndex] = {
        ...packages[packageIndex],
        ...updatedData
    };

    return packages[packageIndex];
};

const deletePackage = (id) => {

    const packageIndex = packages.findIndex(pkg => pkg.id === id);

    if (packageIndex === -1) {
        return false;
    }

    packages.splice(packageIndex, 1);

    return true;
};

module.exports = {
    getAllPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage
};