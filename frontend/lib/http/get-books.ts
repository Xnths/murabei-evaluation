"use server";

import { Book } from "../../types/books";
import { api } from "../api";

interface GetBooksRequest {
  page: number;
  pageSize: number;
}

interface GetBooksResponse {
  books: Book[];
  total: number;
}

export const getBooks = async ({ page, pageSize }: GetBooksRequest) => {
  const data = await api.get<GetBooksResponse>(
    `/api/v1/books?page=${page}&page_size=${pageSize}`
  );

  console.log(data);

  return data;
};
