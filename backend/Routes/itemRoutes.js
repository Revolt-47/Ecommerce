const express = require("express");
const router = express.Router();

let { addItem, getAllItems, getItemById } = require("../Controllers/itemController");
const { VerifyToken, VerifyAdmin } = require("../utils/Authenticate");

router.post("/addItem", VerifyToken , VerifyAdmin, addItem);
router.get("/getAllItems", getAllItems);
router.get("/:id", getItemById);
module.exports = router;