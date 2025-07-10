"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AdvancedSearchProps {
  searchTitle: string;
  setSearchTitle: (value: string) => void;
  searchAuthor: string;
  setSearchAuthor: (value: string) => void;
  pageSize: number;
  setPageSize: (value: number) => void;
  onApply: () => void;
}

export function AdvancedSearch({
  searchTitle,
  setSearchTitle,
  searchAuthor,
  setSearchAuthor,
  pageSize,
  setPageSize,
  onApply,
}: AdvancedSearchProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="filter">
        <AccordionTrigger>Busca avançada</AccordionTrigger>
        <AccordionContent>
          <form className="sm:flex flex-col gap-4 grid grid-cols-3 grid-rows-auto">
            <div>
              <Label htmlFor="title">Título:</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Título do livro"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="author">Autor:</Label>
              <Input
                id="author"
                name="author"
                type="text"
                placeholder="Autor do livro"
                value={searchAuthor}
                onChange={(e) => setSearchAuthor(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="pageSize">Itens por página:</Label>
              <Input
                id="pageSize"
                name="pageSize"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              />
            </div>
            <Button type="button" onClick={onApply}>
              Aplicar filtros
            </Button>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
