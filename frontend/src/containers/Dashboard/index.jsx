import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { booksListStore } from "store/booksList";
import { BooksListService } from "services/books";
import { AuthUserService } from "services/userAuth";
import ReactPaginate from "react-paginate";

const Dashboard = () => {
  const { booksList, totalPages } = booksListStore((state) => ({
    booksList: state.booksList,
    totalPages: state.totalPages,
  }));

  const {
    getBooksList,
    deleteBookFromList,
    filterBookslist,
    onPagechange,
    sortData,
  } = BooksListService();
  const { logoutUser } = AuthUserService();
  const pagination = useRef();

  useEffect(() => {
    getBooksList();
  }, []);

  return (
    <div className="p-4">
      <div className="container">
        <h1>Books List</h1>
        <div className="d-flex">
          <Link to="/addbook" className="btn btn-sm btn-success mb-2">
            Add Book
          </Link>
          <button
            className="btn btn-sm btn-success mb-2 ml-auto"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
        <input
          name="title"
          type="text"
          placeholder="Filter For Category"
          onChange={(e) => {
            filterBookslist("category", e.target.value);
          }}
          className={`form-control mb-3`}
        />
        <input
          name="title"
          type="number"
          placeholder="Filter For Rating greater than entered value."
          onChange={(e) => {
            filterBookslist("ratingCount", e.target.value);
          }}
          className={`form-control`}
        />
        <div className="d-flex mt-3 mb-3">
          Options to sort the data accordingly
          <input
            name="ratings"
            type="checkbox"
            placeholder="Filter For Category"
            onChange={(e) => {
              sortData("rating", e.target.checked);
            }}
            className={`ml-3 mr-3 mt-1`}
          />
          <label> Ratings</label>
          <input
            name="price"
            type="checkbox"
            placeholder="Filter For Rating greater than entered value."
            onChange={(e) => {
              sortData("price", e.target.checked);
            }}
            className={`ml-3 mr-3 mt-1`}
          />
          <label> Price</label>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Title</th>
              <th style={{ width: "10%" }}>Price</th>
              <th style={{ width: "10%" }}>Image</th>
              <th style={{ width: "10%" }}>Author</th>
              <th style={{ width: "10%" }}>Rating</th>
              <th style={{ width: "10%" }}>Category</th>
              <th style={{ width: "30%" }}>Decription</th>
              <th style={{ width: "20%" }}></th>
            </tr>
          </thead>
          <tbody>
            {booksList &&
              booksList.map((book) => (
                <tr key={book.book_id}>
                  <td>{book.title}</td>
                  <td>{book.price}</td>
                  <td>
                    <img
                      src={book.image}
                      alt=""
                      height={"100px"}
                      width={"100px"}
                    />
                  </td>
                  <td>{book.author}</td>
                  <td>{book.rating}</td>
                  <td>{book.category || ""}</td>
                  <td>{book.description}</td>
                  <td style={{ whiteSpace: "nowrap", width: "20%" }}>
                    <Link
                      to={`/viewbook/${book.book_id}`}
                      className="btn btn-sm btn-warning mr-1"
                    >
                      View
                    </Link>
                    <Link
                      to={`/editbook/${book.book_id}`}
                      className="btn btn-sm btn-primary mr-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteBookFromList(book.book_id)}
                      className="btn btn-sm btn-danger btn-delete-user"
                    >
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            {!booksList && (
              <tr>
                <td colSpan="12" className="text-center">
                  <div className="p-2">No Books To Display</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <ReactPaginate
          ref={pagination}
          pageCount={totalPages}
          onPageChange={onPagechange}
          containerClassName="pagination"
          activeClassName="active"
          pageLinkClassName="page-link"
          breakLinkClassName="page-link"
          nextLinkClassName="page-link"
          previousLinkClassName="page-link"
          pageClassName="page-item"
          breakClassName="page-item"
          nextClassName="page-item"
          previousClassName="page-item"
          previousLabel={<>&laquo;</>}
          nextLabel={<>&raquo;</>}
        />
      </div>
    </div>
  );
};

export default Dashboard;
