import { api } from "../../lib/api";
import { Book } from "../../types/books";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const books: Book[] = await api.get("/api/v1/books");

  return (
    <div>
      {books.map((book) => (
        <Card key={book.id}>{book.title}</Card>
      ))}
    </div>
  );
}
