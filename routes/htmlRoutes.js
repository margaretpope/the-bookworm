const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");
const {handleBookSearch} = require("../controllers/search");
const {renderLibrary} = require("../controllers/library")

router.get("/", ({ session: { isLoggedIn } }, res) => {
  res.render("index", { isLoggedIn });
});

router.get("/login", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("login", { error: req.query.error });
});

router.get("/signup", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("signup", { error: req.query.error });
});

router.get("/library", checkAuth, renderLibrary);

router.get("/bookSearch", handleBookSearch);

router.get('/search', (req, res) => {
  res.render('search');
});

module.exports = router;