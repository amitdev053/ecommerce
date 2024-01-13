const express = require("express")
const router = express.Router()
const routesController = require("../Controllers/controller")

// router.get("/", (req, res)=>{

//     res.status(200).send("Welcome to our backend Home Page using -----------Router Class")
// })


router.route("/").get(routesController.Home)
router.route("/product").get(routesController.Product)
router.route("/login").get(routesController.Login)



module.exports = router