"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { slugfy } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { PostBooksRequest } from "../../../lib/http/post-books";

export default function BookPageRoute() {
  const { register, handleSubmit } = useForm<PostBooksRequest>();

  function onSubmit(data: PostBooksRequest) {
    data.author_slug = slugfy(data.author);
    console.log("Dados enviados:", data);
  }

  return (
    <div className="w-svw h-svh flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[300px] flex flex-col gap-4"
      >
        <div>
          <Label htmlFor="title">Título</Label>
          <Input id="title" {...register("title")} />
        </div>
        <div>
          <Label htmlFor="author">Autor</Label>
          <Input id="author" {...register("author")} />
        </div>
        <div>
          <Label htmlFor="publisher">Editora</Label>
          <Input id="publisher" {...register("publisher")} />
        </div>
        <div>
          <Label htmlFor="synopsis">Sinopse</Label>
          <Input id="synopsis" {...register("synopsis")} />
        </div>
        <div>
          <Label htmlFor="author_bio">Biografia do autor</Label>
          <Input id="author_bio" {...register("author_bio")} />
        </div>
        <div>
          <Label htmlFor="authors">Autores</Label>
          <Input id="authors" {...register("authors")} />
        </div>
        <Button type="submit">Criar</Button>
      </form>
    </div>
  );
}
