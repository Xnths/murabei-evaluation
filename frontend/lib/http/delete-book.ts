"use server";

import { api } from "../api";

interface DeleteBookRequest {
  bookId: string;
}

interface DeleteBookResponse {
  message: string;
}

export const deleteBook = async ({ bookId }: DeleteBookRequest) => {
  const data = await api.delete<DeleteBookResponse>(`/api/v1/books/${bookId}`);

  return data;
};
