"use server";

import { Book } from "../../types/books";
import { api } from "../api";

interface GetBooksRequest {
  page: number;
  pageSize: number;
  q?: string;
  title: string;
  author: string;
}

interface GetBooksResponse {
  books: Book[];
  total: number;
}

export const getBooks = async ({
  page,
  pageSize,
  q = "",
  title,
  author,
}: GetBooksRequest) => {
  const data = await api.get<GetBooksResponse>(
    `/api/v1/books?q=${q}&page=${page}&page_size=${pageSize}&title=${title}&author=${author}`
  );

  return data;
};
