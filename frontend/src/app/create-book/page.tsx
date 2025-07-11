"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postBooks, PostBooksRequest } from "../../../lib/http/post-books";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BookPageRoute() {
  const { register, handleSubmit, reset } = useForm<PostBooksRequest>();

  const { mutate, isPending } = useMutation({
    mutationFn: postBooks,
    onSuccess: () => {
      toast.success("Livro criado com sucesso");
      reset();
    },
    onError: () => {
      toast.error("Não foi possível criar o livro. Tente novamente!");
    },
  });

  function onSubmit(data: PostBooksRequest) {
    mutate(data);
  }

  return (
    <div className="w-svw flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Novo livro</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[300px] flex flex-col gap-4"
          >
            <div>
              <Label htmlFor="title">Título</Label>
              <Input required id="title" {...register("title")} />
            </div>
            <div>
              <Label htmlFor="author">Autor</Label>
              <Input required id="author" {...register("author")} />
            </div>
            <div>
              <Label htmlFor="author_slug">Slug do autor</Label>
              <Input required id="author_slug" {...register("author_slug")} />
            </div>
            <div>
              <Label htmlFor="author_bio">Biografia do autor</Label>
              <Input required id="author_bio" {...register("author_bio")} />
            </div>
            <div>
              <Label htmlFor="authors">Autores</Label>
              <Input required id="authors" {...register("authors")} />
            </div>
            <div>
              <Label htmlFor="publisher">Editora</Label>
              <Input required id="publisher" {...register("publisher")} />
            </div>
            <div>
              <Label htmlFor="synopsis">Sinopse</Label>
              <Input required id="synopsis" {...register("synopsis")} />
            </div>
            <Button type="submit" disabled={isPending}>
              Criar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
