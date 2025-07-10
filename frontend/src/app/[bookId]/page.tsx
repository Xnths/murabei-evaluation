import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import { getBook } from "../../../lib/http/get-book";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { sanitizeAndTransform } from "@/lib/sanitize-html";

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
    <div className="p-8">
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <TypographyH1>{book.title}</TypographyH1>
          <TypographyH2>{book.author}</TypographyH2>
        </CardHeader>
        <CardContent>
          {book.biography && (
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeAndTransform(book.biography),
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
