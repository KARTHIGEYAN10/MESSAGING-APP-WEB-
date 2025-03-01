const express = require("express")
const protectroute = require("../middleware/protectroute");
const { getMessages, sendmessage } = require("../controllers/messagecontollers");
const router=express.Router()

router.get("/:id",protectroute,getMessages)
router.post("/send/:id",protectroute,sendmessage)

module.exports=router