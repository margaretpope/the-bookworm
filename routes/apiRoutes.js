const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);

//external API results
router.get("/bookSearch", checkAuth, controllers.search.handleBookSearch)



module.exports = router;
