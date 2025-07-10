"use server";

import { Book } from "../../types/books";
import { api } from "../api";

interface EditBookRequest {
  bookId: string;
  bookData: Book;
}

interface EditBookResponse {
  book: Book;
}

export const editBook = async ({ bookId, bookData }: EditBookRequest) => {
  const data = await api.put<EditBookResponse, Book>(
    `/api/v1/books/${bookId}`,
    bookData
  );

  return data;
};
