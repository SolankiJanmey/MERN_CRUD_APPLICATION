const db = require("../models");
const sequelize = require('sequelize')
const { getPagination, getPagingData } = require('../helpers/paginations');

const Book = db.books;
const Op = sequelize.Op;
require("dotenv").config();

let where = {}
exports.getBookDetails = async (req, res) => {
  const { page, category, ratingCount, sort } = req.query
  const size = 3;
  const { limit, offset } = getPagination(page - 1, size);
  console.log(sort, 'sort')
  try {
    let order = [];
    where = { user_id: res.user.user_id }
    if (category)
      where.category = category;
    if (ratingCount)
      where.rating = {
        [Op.gte]: ratingCount
      }
    if (sort) {
      const options = sort.split(',');
      options.map(option => {
        order.push([option, 'ASC'])
      })
    }
    const data = await Book.findAndCountAll({ where: where, limit, offset, order }).catch((err) => {
      return res.status(400).json({
        err: "Please try again!!",
      });
    });
    const response = getPagingData(data, page, size);
    if (response) {
      return res.send(response)
    }
    else {
      return res.status(500).send({
        err: "Internal error please try again",
      });
    }
  } catch (err) {
    console.log(err, 'err')
    return res.status(500).send({
      err: "Internal error please try again",
    });
  }
};

exports.getSpecificBookDetails = async (req, res) => {
  try {
    const { user_id } = res.user;
    const { id } = req.params;
    let book = await Book.findOne({ where: { user_id, book_id: id } }).catch(
      (e) => {
        return res.status(500).send("Some error occured!!");
      }
    );
    if (!book) {
      return res.status(500).send("No book found");
    }
    else {
      return res.json(book)
    }
  } catch (err) {
    return res.status(500).send({
      err: "Internal error please try again",
    });
  }
}
exports.addBookDetails = async (req, res) => {
  try {
    const { book_details } = req.body;
    const { user_id } = res.user;
    book_details['user_id'] = user_id
    const book = new Book(book_details);
    await book
      .save(book)
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        return res.status(400).json({
          err: "Please try again!!",
        });
      });
  } catch (err) {
    return res.status(500).send({
      err: "Internal error please try again",
    });
  }
};

exports.editBookDetails = async (req, res) => {
  try {
    const { user_id } = res.user
    const { book_id, book_details } = req.body;
    await Book.update(book_details, { where: { book_id, user_id } })
      .then(() => {
        return res.send({
          err: "Details updated successfully!",
        });
      })
      .catch((err) => {
        return res.status(500).send({
          err: "Book not found",
        });
      });
  } catch (err) {
    console.log(err, "err");
    return res.status(500).send({
      err: "Internal error please try again",
    });
  }
};

exports.deleteBookDetails = async (req, res) => {
  const { user_id } = res.user;
  const { book_id } = req.body;
  try {
    let book = await Book.findOne({ where: { user_id, book_id } }).catch(
      (e) => {
        return res.status(500).send("Some error occured!!");
      }
    );
    if (!book) {
      return res.status(500).send("No book found");
    }
    book.destroy();
    return res.send("Book delete successfully!");
  } catch (err) {
    console.log(err, "err");
    return res.status(500).send({
      err: "Internal error please try again",
    });
  }
};
