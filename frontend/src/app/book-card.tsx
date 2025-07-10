// components/book-card.tsx
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { bookPageRoute } from "../lib/routes";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
}

export function BookCard({ id, title, author }: BookCardProps) {
  return (
    <Card className="w-[300px] h-[200px] flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{author}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-row justify-between">
        <Link href={bookPageRoute(id)}>
          <Button variant="outline">Detalhes</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
