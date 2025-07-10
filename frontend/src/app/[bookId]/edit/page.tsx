"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { getBook } from "../../../../lib/http/get-book";
import { Book } from "../../../../types/books";

interface EditBookPageProps {
  params: {
    bookId: string;
  };
}

export default function EditBookPage({
  params: { bookId },
}: EditBookPageProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => getBook({ bookId }),
  });

  const { register, handleSubmit, reset } = useForm<Book>();

  if (isLoading) return <div>Carregando livro...</div>;
  if (error || !data?.book) return <div>Erro ao carregar o livro.</div>;

  function onSubmit(formData: Book) {
    console.log("Dados enviados:", formData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl p-6">
      <input type="hidden" {...register("id")} />

      <div>
        <Label htmlFor="title">Título</Label>
        <Input id="title" {...register("title")} />
      </div>

      <div>
        <Label htmlFor="author">Autor</Label>
        <Input id="author" {...register("author")} />
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea id="description" {...register("biography")} />
      </div>

      <Button type="submit">Salvar alterações</Button>
    </form>
  );
}
