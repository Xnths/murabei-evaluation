import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import { api } from "../../../lib/api";
import { Book } from "../../../types/books";
import { getBook } from "../../../lib/http/get-book";

interface bookPageRouteProps {
  params: {
    bookId: string;
  };
}

export default async function bookPageRoute({
  params: { bookId },
}: bookPageRouteProps) {
  const { book } = await getBook({ bookId });

  return (
    <div>
      <TypographyH1>{book.title}</TypographyH1>
      <TypographyH2>{book.author}</TypographyH2>
      {book.biography && <p>{book.biography.replace(/<[^<>]+?>/g, "")}</p>}
    </div>
  );
}
