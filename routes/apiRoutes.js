const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);

//API results
router.get("/bookSearch", checkAuth, controllers.search.bookSearch)



module.exports = router;
