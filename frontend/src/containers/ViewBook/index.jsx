import React, { useEffect } from "react";
import AddEdit from "components/AddEdit";
import { booksListStore } from "store/booksList";
import { useParams } from "react-router-dom";
import { BooksListService } from "services/books";

const Viewbook = ({ props }) => {
  const params = useParams();
  const { getBookDetails } = BooksListService();
  const { booksList } = booksListStore((state) => ({
    booksList: state.booksList,
  }));

  useEffect(() => {
    if (params.book_id) {
      getBookDetails(params.book_id);
    }
  }, []);

  return (
    <div>
      <AddEdit isView bookId={params.book_id} />
    </div>
  );
};

export default Viewbook;
