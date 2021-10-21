module.exports = (app) => {
  const user = require("../controllers/user.controller");
  const book = require("../controllers/book.controller");
  const authenticateUser = require("../helpers/authMiddleware");
  var router = require("express").Router();

  // Create a new user
  router.post("/signup", user.create);

  // Authenticate login user
  router.post("/authenticate", user.authenticate);

  // Get books record
  router.get("/get_book", authenticateUser, book.getBookDetails);

  // Get specific book record
  router.get("/get_book_detail/:id", authenticateUser, book.getSpecificBookDetails);

  // Create a new book record
  router.post("/add_book", authenticateUser, book.addBookDetails);

  // Edit a book record
  router.post("/edit_book", authenticateUser, book.editBookDetails);

  // Delete a book record
  router.delete("/delete_book", authenticateUser, book.deleteBookDetails);

  app.use("/", router);
};
