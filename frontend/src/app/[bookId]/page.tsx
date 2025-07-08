import { api } from "../../../lib/api";
import { Book } from "../../../types/books";

interface BookPageProps {
  params: {
    bookId: string;
  };
}

export default async function BookPage({ params: { bookId } }: BookPageProps) {
  const book: Book = await api.get(`/api/v1/books/${bookId}`);

  return <div>{book ? book.title : "oi"}</div>;
}
