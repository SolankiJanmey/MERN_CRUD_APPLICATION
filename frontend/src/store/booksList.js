import create from "zustand";

export const booksListStore = create((set) => ({
  booksList: [],
  setBooksList: (booksList) => set(() => ({ booksList })),
  editBookDetails: {},
  setEditBookDetail: (editBookDetails) => set(() => ({ editBookDetails })),
  totalPages: 1,
  setTotalPage: (totalPages) => set(() => ({ totalPages })),
  currentPage: 1,
  setCurrentPage: (currentPage) => set((state) => ({ currentPage }, state.searchQueryObj['page'] = currentPage)),
  searchQueryObj: { sort: '' },
  setSearchQueryObj: (searchQueryObj) => set(() => ({ searchQueryObj }))
}));
