export const homePage = "/";

export const bookPageRoute = (bookId: string) => {
  return `/${bookId}`;
};
export const editBookPageRoute = (bookId: string) => {
  return `${bookPageRoute(bookId)}/edit`;
};

export const createBookPageRoute = "/create-book";
