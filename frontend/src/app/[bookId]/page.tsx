import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import { api } from "../../../lib/api";
import { Book } from "../../../types/books";

interface BookPageProps {
  params: {
    bookId: string;
  };
}

export default async function BookPage({ params: { bookId } }: BookPageProps) {
  const book: Book = await api.get(`/api/v1/books/${bookId}`);

  return (
    <div>
      <TypographyH1>{book.title}</TypographyH1>
      <TypographyH2>{book.author}</TypographyH2>
      <p>{book.biography.replace(/<[^<>]+?>/g, "")}</p>
    </div>
  );
}
