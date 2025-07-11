"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { bookPageRoute, editBookPageRoute } from "../lib/routes";
import { PencilIcon, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook } from "../../lib/http/delete-book";
import { toast } from "sonner";
import { Book } from "../../types/books";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (bookId: string) => deleteBook({ bookId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Livro excluído com sucesso.");
    },
    onError: (error) => {
      console.error("Erro ao deletar o livro:", error);
      toast.error("Erro ao excluir o livro. Tente novamente!");
    },
  });

  return (
    <Card className="w-[300px] h-[250px] flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>{book.author}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-end gap-4">
        <span className="font-bold text-sm opacity-60">{book.price}</span>
        <div className="flex flex-row justify-between w-full">
          <Link href={bookPageRoute(book.id)}>
            <Button variant="outline">Detalhes</Button>
          </Link>
          <div className="flex flex-row gap-2">
            <Link href={editBookPageRoute(book.id)}>
              <Button type="button" variant="outline" size="icon">
                <PencilIcon className="size-4 opacity-50" />
              </Button>
            </Link>
            <Button
              onClick={() => mutate(book.id)}
              type="button"
              variant="outline"
              size="icon"
              disabled={isPending}
            >
              <Trash className="size-4 opacity-50" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
