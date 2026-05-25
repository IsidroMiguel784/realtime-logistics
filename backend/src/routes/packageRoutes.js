const express = require("express");

const router = express.Router();

const packageController = require("../controllers/packageController");

const validatePackageMiddleware = require("../middleware/validatePackageMiddleware");

router.get("/", packageController.getPackages);

router.get("/:id", packageController.getPackage);

router.post(
    "/",
    validatePackageMiddleware,
    packageController.createPackage
);

router.put("/:id", packageController.updatePackage);

router.delete("/:id", packageController.deletePackage);

module.exports = router;
