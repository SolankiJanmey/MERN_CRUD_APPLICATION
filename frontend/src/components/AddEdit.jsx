import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BooksListService } from "services/books";
import { booksListStore } from "store/booksList";

const AddEdit = ({ isEdit, bookId, isView }) => {
  const { addNewBook, editBookFromList } = BooksListService();
  const { editBookDetails } = booksListStore((state) => ({
    editBookDetails: state.editBookDetails,
  }));

  let FormInitialValues = {
    title: ((isEdit || isView) && editBookDetails.title) || "",
    price: ((isEdit || isView) && editBookDetails.price) || "",
    author: ((isEdit || isView) && editBookDetails.author) || "",
    rating: ((isEdit || isView) && editBookDetails.rating) || "",
    category: ((isEdit || isView) && editBookDetails.category) || "",
    description: ((isEdit || isView) && editBookDetails.description) || "",
  };

  const FormValidate = Yup.object().shape({
    title: Yup.string().required("Title is required!"),
    price: Yup.string().required("Price is required!"),
    author: Yup.string().required("Author is required!"),
    rating: Yup.string()
      .max(5, "Rating must be out of 5!")
      .required("Rating is required!"),
    category: Yup.string().required("Category is required!"),
    description: Yup.string().required("Description is required!"),
  });

  const handleFormSubmit = async (values) => {
    if (isEdit) {
      editBookFromList(bookId, values);
    } else addNewBook(values);
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: FormInitialValues,
    enableReinitialize: true,
    validationSchema: FormValidate,
    onSubmit: handleFormSubmit,
  });

  return (
    <div className="p-4">
      <div className="container">
        <h1>{isEdit ? "Edit" : isView ? "View" : "Add"} Book Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col">
              <label>Title</label>
              <input
                name="title"
                type="text"
                disabled={isView}
                onChange={handleChange}
                value={values.title}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.title}</div>
            </div>
            <div className="form-group col">
              <label>Price</label>
              <input
                name="price"
                disabled={isView}
                type="number"
                onChange={handleChange}
                value={values.price}
                className={`form-control ${errors.price ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.price}</div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label>Author</label>
              <input
                name="author"
                disabled={isView}
                type="text"
                onChange={handleChange}
                value={values.author}
                className={`form-control ${errors.author ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.author}</div>
            </div>
            <div className="form-group col">
              <label>Rating</label>
              <input
                name="rating"
                disabled={isView}
                type="number"
                onChange={handleChange}
                value={values.rating}
                className={`form-control ${errors.rating ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.rating}</div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label>Category</label>
              <input
                name="category"
                type="text"
                disabled={isView}
                onChange={handleChange}
                value={values.category}
                className={`form-control ${
                  errors.category ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.category}</div>
            </div>
            <div className="form-group col">
              <label>Description</label>
              <input
                name="description"
                disabled={isView}
                type="text"
                onChange={handleChange}
                value={values.description}
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.description}</div>
            </div>
          </div>
          <div className="form-group">
            {!isView && (
              <button type="submit" className="btn btn-primary mr-2">
                Save
              </button>
            )}
            <Link to="/" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEdit;
