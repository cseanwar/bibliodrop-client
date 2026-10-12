import { protectedFetch, protectedMutation, serverFetch, serverMutation } from "../core/server";

export const addBook = async (newBook) => {
  return protectedMutation("/api/books", newBook);
};

export const getBooksByLibrarian = async (email) => {
  return protectedFetch(`/api/books/librarian/${email}`);
};

export const getSingleBook = async (id) => {
  return serverFetch(`/api/books/${id}`);
};

export const updateBook = async (
  id,
  updatedBook
) => {
  return protectedFetch(
  `/api/books/${id}`,
  "PATCH",
  updatedBook
);
};

export const deleteBook = async (id) => {
  return protectedFetch(
    `/api/books/${id}`,
    "DELETE"
  );
};

export const toggleBookStatus = async (id) => {
  return protectedMutation(
    `/api/books/toggle-status/${id}`,
    {},
    "PATCH"
  );
};

export const getAllBooks = async ({
  search = "",
  category = "",
  sort = "",
  availability = "",
  minFee = "",
  maxFee = "",
  page = 1,
  perPage = 8,
}) => {
  const queryParams = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
    ...(search ? { search } : {}),
    ...(category ? { category } : {}),
    ...(sort ? { sort } : {}),
    ...(availability ? { availability } : {}),
    ...(minFee ? { minFee: String(minFee) } : {}),
    ...(maxFee ? { maxFee: String(maxFee) } : {}),
  });

  return serverFetch(`/api/books?${queryParams.toString()}`);
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

export const getFeaturedBooks = async () => {
  return serverFetch("/api/books/featured");
};