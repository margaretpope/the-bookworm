const { User } = require("../models");

async function create(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.redirect("/signup?error=must include username and password");

    const user = await User.create(username, password);

    if (!user) return res.redirect("/signup?error=error creating new user");

    req.session.isLoggedIn = true;
    req.session.user_id = user.id;
    req.session.save(() => res.redirect("/"));
  } catch (err) {
    console.log(err);
    let errorMessage = "An unexpected error occured.";
    if(err.code === "ER_DUP_ENTRY" || (err.sqlMessage && err.sqlMessage.includes("Duplicate entry"))) {
      errorMessage = "Username already in use. Try another one!";
    }
    return res.redirect(`/signup?error=${encodeURIComponent(errorMessage)}`);
  }
}

module.exports = { create };