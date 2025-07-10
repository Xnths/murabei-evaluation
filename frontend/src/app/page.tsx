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

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const q = searchParams.get("q") || "";
  const title = searchParams.get("title") || "";
  const author = searchParams.get("author") || "";
  const pageSize = Number(searchParams.get("pageSize")) || 9;
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["books", currentPage, pageSize, q, title, author],
    queryFn: () => getBooks({ page: currentPage, pageSize, q, title, author }),
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

  const showRemoveFiltersButton =
    q !== "" || title !== "" || author !== "" || searchParams.has("pageSize");

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar livros</div>;

  return (
    <div className="w-screen h-full p-8">
      <div className="flex flex-col justify-center w-full gap-8">
        <Link href={createBookPageRoute}>
          <Button className="w-fit">Adicionar livro</Button>
        </Link>

        <Search />

        <AdvancedSearch
          searchTitle={title}
          setSearchTitle={(value) =>
            applyFilters({ title: value, q, author, pageSize })
          }
          searchAuthor={author}
          setSearchAuthor={(value) =>
            applyFilters({ author: value, q, title, pageSize })
          }
          pageSize={pageSize}
          setPageSize={(value) =>
            applyFilters({ pageSize: value, q, title, author })
          }
          onApply={() => applyFilters({ q, title, author, pageSize })}
        />

        {showRemoveFiltersButton && (
          <Button onClick={removeFilters}>Limpar busca</Button>
        )}

        <div className="flex flex-row flex-wrap items-center gap-4">
          {data?.books?.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
            />
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
