"use server";

import { Book } from "../../types/book";
import { api } from "../api";

interface GetBooksRequest {
  page: number;
  pageSize: number;
  q?: string;
  title?: string;
  author?: string;
  alpAsc?: string;
}

interface GetBooksResponse {
  books: Book[];
  total: number;
}

export const getBooks = async ({
  page,
  pageSize,
  q = "",
  title = "",
  author = "",
  alpAsc = "",
}: GetBooksRequest) => {
  const data = await api.get<GetBooksResponse>(
    `/api/v1/books?q=${q}&page=${page}&page_size=${pageSize}&title=${title}&author=${author}&alp_asc=${alpAsc}`
  );

  return data;
};
