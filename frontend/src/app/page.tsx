"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { bookPage } from "../../lib/routes";
import { getBooks } from "../../lib/http/get-books";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const page = 1;
  const pageSize = 9;

  const searchParams = useSearchParams();
  const router = useRouter();

  const q = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(q);

  const { data, isLoading, error } = useQuery({
    queryKey: ["books", page, pageSize, q],
    queryFn: () => getBooks({ page, pageSize, q }),
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();
    if (searchTerm) params.set("q", searchTerm);

    router.push(`/?${params.toString()}`);
  }

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar livros</div>;

  return (
    <div className="w-screen h-full p-8">
      <div className="flex flex-col justify-center w-full gap-8">
        <Button className="w-fit">Adicionar livro</Button>
        <form onSubmit={onSubmit}>
          <div>
            <Label htmlFor="search">Buscar:</Label>
            <Input
              id="search"
              name="q"
              type="text"
              placeholder="Título do livro ou autor"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit">Buscar</Button>
        </form>
        <div className="flex flex-row flex-wrap items-center gap-4">
          {data?.books?.map((book) => (
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
