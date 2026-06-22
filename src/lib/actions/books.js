import { serverFetch, serverMutation } from "../core/server";

export const addBook = async (newBook) => {
  return serverMutation("/api/books", newBook);
};

export const getBooksByLibrarian = async (email) => {
  return serverFetch(`/api/books/librarian/${email}`);
};

export const getSingleBook = async (id) => {
  return serverFetch(`/api/books/${id}`);
};

export const updateBook = async (id, updatedBook) => {
  return serverMutation(
    `/api/books/${id}`,
    updatedBook,
    "PATCH"
  );
};

export const deleteBook = async (id) => {
  return serverMutation(
    `/api/books/${id}`,
    {},
    "DELETE"
  );
};

export const toggleBookStatus = async (id) => {
  return serverMutation(
    `/api/books/toggle-status/${id}`,
    {},
    "PATCH"
  );
};

export const getAllBooks = async (
  search = "",
  category = "",
  sort = ""
) => {
  return serverFetch(
    `/api/books?search=${search}&category=${category}&sort=${sort}`
  );
};

export const getBookDetails = async (id) => {
  return serverFetch(`/api/books/${id}`);
};

export const getBookById = async (id) => {
  return serverFetch(`/api/books/${id}`);
};

export const getRelatedBooks = async ( category, bookId ) => {
  return serverFetch(
    `/api/books/related/${category}/${bookId}`
  );
};

// export const getPendingBooks = async () => {
//   return serverFetch("/api/books/pending");
// };

// export const approveBook = async (id) => {
//   return serverMutation(
//     `/api/admin/books/approve/${id}`,
//     {},
//     "PATCH"
//   );
// };

// export const adminDeleteBook = async (id) => {
//   return serverMutation(
//     `/api/admin/books/${id}`,
//     {},
//     "DELETE"
//   );
// };