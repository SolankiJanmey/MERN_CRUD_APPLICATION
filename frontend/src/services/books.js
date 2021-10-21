import { booksListStore } from "store/booksList";
import { useHistory } from "react-router";
import { axiosAuthGet, axiosAuthDelete, axiosAuthPost } from "helpers/axios";
import apiConstant from "constants/apiContants";
import queryString from 'query-string';
import debounce from 'lodash.debounce';

const obj = {};
const sortOptions = [];
export function BooksListService(values) {
  const history = useHistory();
  const { currentPage, setBooksList, setEditBookDetail, setCurrentPage, setTotalPage, setSearchQueryObj, searchQueryObj } = booksListStore((state) => ({
    currentPage: state.currentPage,
    setBooksList: state.setBooksList,
    setEditBookDetail: state.setEditBookDetail,
    setCurrentPage: state.setCurrentPage,
    setTotalPage: state.setTotalPage,
    setSearchQueryObj: state.setSearchQueryObj,
    searchQueryObj: state.searchQueryObj
  }));

  const getBooksList = async (queryString = `page=${currentPage}&sort=`) => {
    try {
      let response = await axiosAuthGet(`${apiConstant.GET_BOOK_LIST_URL}?${queryString}`);
      if (!response) {
        console.log(response.error);
      } else {
        setBooksList(response?.books);
        setCurrentPage(response.currentPage);
        setTotalPage(response.totalPages)
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  const getBookDetails = async (id) => {
    try {
      let response = await axiosAuthGet(`${apiConstant.GET_BOOK_DETAIL_URL}/${id}`);
      if (!response) {
        console.log(response.error);
      } else {
        setEditBookDetail(response);
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  const deleteBookFromList = async (id) => {
    try {
      let response = await axiosAuthDelete(apiConstant.DELETE_BOOK_LIST_URL, {
        book_id: id,
      });
      if (!response) {
        console.log(response.error);
      } else {
        getBooksList();
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  const editBookFromList = async (id, values) => {
    try {
      let response = await axiosAuthPost(apiConstant.EDIT_BOOK_LIST_URL, {
        book_id: id,
        book_details: values
      });
      if (!response) {
        console.log(response.error);
      } else {
        history.push('/');
      }
    } catch (err) {
      console.log(err, "err");
    }
  };

  const addNewBook = async (values) => {
    try {
      let response = await axiosAuthPost(apiConstant.ADD_BOOK_LIST_URL, {
        book_details: values,
      });
      if (!response || response.err) {
        console.log(response.error);
      } else {
        history.push('/')
      }
    } catch (err) {
      console.log(err, "err");
    }
  }

  const filterBookslist = debounce(async (field, value) => {
    obj['page'] = currentPage;
    if (!value) {
      delete obj[field];
    }
    else obj[field] = value;
    const filterString = queryString.stringify(obj);
    setSearchQueryObj(filterString);
    try {
      let response = await axiosAuthGet(`${apiConstant.GET_BOOK_LIST_URL}?${filterString}`);
      if (!response) {
        console.log(response.error);
      } else {
        setBooksList(response?.books);
        setCurrentPage(response.currentPage);
        setTotalPage(response.totalPages)
      }
    } catch (err) {
      console.log(err, "err");
    }
  }, 1000);

  const onPagechange = async ({ selected }) => {
    const obj = { ...searchQueryObj };
    obj['page'] = selected + 1;
    const filterString = queryString.stringify(obj);
    setSearchQueryObj(obj);
    getBooksList(filterString);
  }

  const sortData = async (field, value) => {
    const obj = { ...searchQueryObj };
    if (value) sortOptions.push(field);
    else sortOptions.splice(sortOptions.indexOf(field), 1);
    obj.sort = sortOptions.join(',');
    const filterString = queryString.stringify(obj);
    setSearchQueryObj(obj);
    getBooksList(filterString)
  }
  return { getBooksList, getBookDetails, deleteBookFromList, editBookFromList, addNewBook, filterBookslist, onPagechange, sortData };
}
