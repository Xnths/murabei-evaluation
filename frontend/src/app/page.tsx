"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { bookPageRoute, createBookPageRoute, homePage } from "../lib/routes";
import { getBooks } from "../../lib/http/get-books";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { PaginatedNavigation } from "./paginated-navigator";
import { AdvancedSearch } from "./advanced-search";
import { Search } from "./search";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const q = searchParams.get("q") || "";
  const pageSize = Number(searchParams.get("pageSize")) || 9;
  const currentPage = Number(searchParams.get("page") || 1);
  const title = searchParams.get("title") || "";
  const author = searchParams.get("author") || "";

  const [searchTerm, setSearchTerm] = useState(q);
  const [searchTitle, setSearchTitle] = useState(title);
  const [searchAuthor, setSearchAuthor] = useState(author);
  const [customPageSize, setCustomPageSize] = useState(pageSize);

  const { data, isLoading, error } = useQuery({
    queryKey: ["books", currentPage, pageSize, q, title, author],
    queryFn: () => getBooks({ page: currentPage, pageSize, q, title, author }),
  });

  const totalPages = Math.ceil((data?.total || 1) / pageSize);

  function applyFilters() {
    setSearchTerm("");
    const params = new URLSearchParams();
    params.set("q", searchTerm);
    if (searchTerm) params.set("q", searchTerm);
    if (searchTitle) params.set("title", searchTitle);
    if (searchAuthor) params.set("author", searchAuthor);
    if (customPageSize) params.set("pageSize", String(customPageSize));
    params.set("page", "1");

    router.push(`/?${params.toString()}`);
  }

  function removeFilters() {
    router.push(homePage);
  }

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/?${params.toString()}`);
  }

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar livros</div>;

  const showRemoveFiltersButton =
    searchParams.has("q") ||
    searchParams.has("title") ||
    searchParams.has("author") ||
    searchParams.has("pageSize");

  return (
    <div className="w-screen h-full p-8">
      <div className="flex flex-col justify-center w-full gap-8">
        <Link href={createBookPageRoute}>
          <Button className="w-fit">Adicionar livro</Button>
        </Link>
        <Search />
        <AdvancedSearch
          searchTitle={searchTitle}
          setSearchTitle={setSearchTitle}
          searchAuthor={searchAuthor}
          setSearchAuthor={setSearchAuthor}
          pageSize={customPageSize}
          setPageSize={setCustomPageSize}
          onApply={applyFilters}
        />
        {showRemoveFiltersButton && (
          <Button onClick={() => removeFilters()}>Limpar busca</Button>
        )}

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
              <CardFooter className="flex flex-row justify-between">
                <Link href={bookPageRoute(book.id)}>
                  <Button variant="outline">Detalhes</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <PaginatedNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </div>
    </div>
  );
}
