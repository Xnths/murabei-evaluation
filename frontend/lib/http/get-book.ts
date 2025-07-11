"use server";

import { Book } from "../../types/book";
import { api } from "../api";

interface GetBookRequest {
  bookId: string;
}

interface GetBookResponse {
  book: Book;
}

export const getBook = async ({ bookId }: GetBookRequest) => {
  const data = await api.get<GetBookResponse>(`/api/v1/books/${bookId}`);
  return data;
};
