"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { getBook } from "../../../../lib/http/get-book";
import { Book } from "../../../../types/books";
import { editBook } from "../../../../lib/http/edit-book";
import { toast } from "sonner";

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

  const { register, handleSubmit, reset } = useForm<Book>({
    defaultValues: async () => {
      const response = await getBook({ bookId });
      return response.book;
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: Book) => editBook({ bookId, bookData: formData }),
    onSuccess: (response) => {
      reset(response.book);
      toast.success("Livro editado com sucesso.");
    },
    onError: (error) => {
      toast.error("Erro ao editar os dados do livro. Tente novamente!");
      console.log(error.message);
    },
  });

  function onSubmit(formData: Book) {
    mutation.mutate(formData);
  }

  if (isLoading) return <div>Carregando livro...</div>;
  if (error || !data?.book) return <div>Erro ao carregar o livro.</div>;

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
        <Label htmlFor="description">Biografia</Label>
        <Textarea
          className="resize-none"
          id="description"
          {...register("biography")}
        />
      </div>

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Salvando..." : "Salvar alterações"}
      </Button>
    </form>
  );
}
