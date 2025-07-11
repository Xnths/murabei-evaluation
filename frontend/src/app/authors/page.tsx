"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { getAuthors } from "../../../lib/http/get-authors";
import { sanitizeAndTransform } from "@/lib/sanitize-html";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaginatedNavigation } from "../paginated-navigator";

export default function AuthorsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = 9;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["authors", currentPage],
    queryFn: () => getAuthors({ page: currentPage, pageSize }),
  });

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  }

  if (isLoading) return <div>Carregando autores...</div>;
  if (isError) return <div>Erro ao carregar autores.</div>;

  let totalPages;
  if (data) {
    totalPages = Math.ceil(data.total / pageSize);
  } else {
    totalPages = 0;
  }

  return (
    <div className="w-full lg:w-[1000px] grid grid-cols-1 gap-4">
      {data?.authors.map((author) => (
        <Card key={author.id}>
          <CardHeader>
            <CardTitle>
              <h2 className="text-lg font-semibold">{author.name}</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="opacity-60"
              dangerouslySetInnerHTML={{
                __html: sanitizeAndTransform(author.biography),
              }}
            />
          </CardContent>
        </Card>
      ))}
      <PaginatedNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
    </div>
  );
}
