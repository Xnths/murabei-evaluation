"use server";

import { Book } from "../../types/books";
import { api } from "../api";

interface GetBooksRequest {
  page: number;
  pageSize: number;
  q?: string;
}

interface GetBooksResponse {
  books: Book[];
  total: number;
}

export const getBooks = async ({ page, pageSize, q = "" }: GetBooksRequest) => {
  const data = await api.get<GetBooksResponse>(
    `/api/v1/books?q=${q}&page=${page}&page_size=${pageSize}`
  );

  return data;
};
