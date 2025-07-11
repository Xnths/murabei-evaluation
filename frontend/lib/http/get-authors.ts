"use server";

import { Author } from "../../types/author";
import { api } from "../api";

interface GetAuthorsRequest {
  page: number;
  pageSize: number;
  q?: string;
  title?: string;
  author?: string;
  alpAsc?: boolean;
}

interface GetAuthorsResponse {
  authors: Author[];
  total: number;
}

export const getAuthors = async ({
  page,
  pageSize,
  q = "",
  title = "",
  author = "",
  alpAsc = false,
}: GetAuthorsRequest): Promise<GetAuthorsResponse> => {
  const queryParams = new URLSearchParams({
    q,
    page: String(page),
    page_size: String(pageSize),
    title,
    author,
    alp_asc: alpAsc ? "true" : "false",
  });

  const url = `/api/v1/authors?${queryParams.toString()}`;

  const data = await api.get<GetAuthorsResponse>(url);
  return data;
};
