import { api } from "../../lib/api";
import { Book } from "../../types/books";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { bookPage } from "../../lib/routes";

export default async function Home() {
  const books: Book[] = await api.get("/api/v1/books?page=1&page_size=9");

  return (
    <div className="w-screen h-full p-8">
      <div className="flex flex-col justify-center w-full gap-8">
        <Button className="w-fit">Adicionar livro</Button>
        <div className="flex flex-row flex-wrap items-center gap-4">
          {books.map((book) => (
            <Card
              key={book.id}
              className="w-[300px] h-[200px] flex flex-col justify-between"
            >
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
                <CardDescription>{book.author}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={bookPage(book.id)}>
                  <Button variant="outline">Detalhes</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
