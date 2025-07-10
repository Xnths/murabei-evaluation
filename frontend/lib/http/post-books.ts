"use server";

import { api } from "../api";

export type PostBooksRequest = {
  title: string;
  author: string;
  author_slug: string;
  author_bio: string;
  authors: string;
  publisher: string;
  synopsis: string;
};

interface PostBooksResponse {
  id: string;
  title: string;
  author: string;
  author_slug: string;
  author_bio: string;
  authors: string;
  publisher: string;
  synopsis: string;
}

export const postBooks = async ({
  title,
  author,
  author_slug,
  author_bio,
  authors,
  publisher,
  synopsis,
}: PostBooksRequest) => {
  const data = await api.post<PostBooksResponse, PostBooksRequest>(
    `/api/v1/books`,
    {
      title,
      author,
      author_slug,
      author_bio,
      authors,
      publisher,
      synopsis,
    }
  );

  return data;
};
