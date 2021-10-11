const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get("/", userController.getAllUsers);
router.get("/:user", userController.findUser);
router.post("/", userController.addUser);
router.post("/login", userController.login);
router.put("/", userController.updateUser);
router.delete("/", userController.deleteUser);

module.exports = router;