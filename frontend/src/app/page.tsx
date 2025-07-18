"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createBookPageRoute, homePage } from "../lib/routes";
import { getBooks } from "../../lib/http/get-books";
import { PaginatedNavigation } from "./paginated-navigator";
import { AdvancedSearch } from "./advanced-search";
import { Search } from "./search";
import { BookCard } from "./book-card";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDownAZ, ArrowUpAZ, Plus } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const q = searchParams.get("q") || "";
  const title = searchParams.get("title") || "";
  const author = searchParams.get("author") || "";
  const pageSize = Number(searchParams.get("pageSize")) || 9;
  const currentPage = Number(searchParams.get("page")) || 1;
  const alpAsc = !(searchParams.get("alpAsc") === "false");

  const [searchTitle, setSearchTitle] = useState<string>(title);
  const [searchAuthor, setSearchAuthor] = useState<string>(author);
  const [searchPageSize, setSearchPageSize] = useState<number>(pageSize);
  const [searchIsAlpAsc, setSearchIsAlpAsc] = useState<boolean>(alpAsc);

  const { data, isLoading, error } = useQuery({
    queryKey: ["books", currentPage, pageSize, q, title, author, alpAsc],
    queryFn: () =>
      getBooks({
        page: currentPage,
        pageSize,
        q,
        title,
        author,
        alpAsc: alpAsc.toString(),
      }),
  });

  const totalPages = Math.ceil((data?.total || 1) / pageSize);

  function applyFilters({
    q,
    title,
    author,
    pageSize,
  }: {
    q?: string;
    title?: string;
    author?: string;
    pageSize?: number;
  }) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (title) params.set("title", title);
    if (author) params.set("author", author);
    if (pageSize) params.set("pageSize", String(pageSize));
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

  function toggleAlpAsc() {
    const newAlpAsc = !searchIsAlpAsc;
    setSearchIsAlpAsc(newAlpAsc);

    const params = new URLSearchParams(searchParams.toString());
    params.set("alpAsc", newAlpAsc.toString());
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  }

  const showRemoveFiltersButton =
    q !== "" || title !== "" || author !== "" || searchParams.has("pageSize");

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar livros</div>;

  return (
    <div className="w-full lg:w-[1000px]">
      <div className="flex flex-col justify-center w-full gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Buscar</CardTitle>
          </CardHeader>
          <CardContent>
            <Search />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <AdvancedSearch
              searchTitle={searchTitle}
              setSearchTitle={setSearchTitle}
              searchAuthor={searchAuthor}
              setSearchAuthor={setSearchAuthor}
              pageSize={searchPageSize}
              setPageSize={setSearchPageSize}
              onApply={() =>
                applyFilters({
                  title: searchTitle,
                  author: searchAuthor,
                  pageSize: searchPageSize,
                })
              }
            />
          </CardContent>
        </Card>

        <div className="flex flex-row gap-4">
          <Link href={createBookPageRoute} className="w-fit">
            <Button className="w-fit">
              <Plus />
              <span>Adicionar livro</span>
            </Button>
          </Link>
          <Button onClick={removeFilters} disabled={!showRemoveFiltersButton}>
            Limpar busca
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row justify-between items-center">
              <span>Livros</span>
              <Button
                onClick={toggleAlpAsc}
                size="icon"
                variant="outline"
                aria-label="Alternar ordenação alfabética"
              >
                {searchIsAlpAsc ? (
                  <ArrowDownAZ className="size-4" />
                ) : (
                  <ArrowUpAZ className="size-4" />
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex w-full items-center justify-center">
              <div className="flex flex-col flex-wrap items-center gap-4 lg:grid grid-cols-3 grid-rows-auto w-fit">
                {data?.books?.map((book) => (
                  <BookCard key={`book-${book.id}`} book={book} />
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <PaginatedNavigation
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
