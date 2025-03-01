const express=require("express")
const protectRoute=require("../middleware/protectroute")
const { getUserForSidebar } = require("../controllers/usercontroller")

const router=express.Router()

router.get("/",protectRoute,getUserForSidebar)
module.exports=router