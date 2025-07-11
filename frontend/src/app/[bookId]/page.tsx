import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
} from "@/components/ui/typography";
import { getBook } from "../../../lib/http/get-book";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { sanitizeAndTransform } from "@/lib/sanitize-html";
import { Copy } from "lucide-react";
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

  return (
    <div className="p-8">
      <Card>
        <CardHeader className="flex flex-col gap-4">
          <TypographyH1>{book.title}</TypographyH1>
          <TypographyH2>{book.author}</TypographyH2>
          <CopyItem value="oi" />
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
