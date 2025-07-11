import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
} from "@/components/ui/typography";
import { getBook } from "../../../lib/http/get-book";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { sanitizeAndTransform } from "@/lib/sanitize-html";
import CopyItem from "@/components/copy-item";

interface bookPageRouteProps {
  params: {
    bookId: string;
  };
}

export default async function bookPageRoute({
  params: { bookId },
}: bookPageRouteProps) {
  const { book } = await getBook({ bookId });

  const citation = `${book.author.toUpperCase()}. ${book.title}. ${
    book.edition
  } ed. ${book.publisher}, ${book.pubdate}.`;

  return (
    <div className="p-8">
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <TypographyH1>{book.title}</TypographyH1>
          <TypographyH2>{book.author}</TypographyH2>
          <Card>
            <CardHeader className="font-bold">Citação</CardHeader>
            <CardContent className="flex flex-row gap-4 items-center">
              <span className="w-[200px] overflow-clip h-[40px] truncate lg:w-full lg:max-w-[900px] px-4 py-2 border-black/10 border-2 rounded-xl">
                {citation}
              </span>
              <CopyItem value={citation} />
            </CardContent>
          </Card>
        </CardHeader>
        <CardContent>
          {book.synopsis && (
            <div>
              <TypographyH3>Sinopse</TypographyH3>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeAndTransform(book.synopsis),
                }}
              />
            </div>
          )}

          {book.biography && (
            <div>
              <TypographyH3>Biografia do autor</TypographyH3>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeAndTransform(book.biography),
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
