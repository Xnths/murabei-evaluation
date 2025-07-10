"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchIcon, X } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

type FormValues = {
  q: string;
};

export const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const q = searchParams.get("q") || "";

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { q },
  });

  function onSubmit(data: FormValues) {
    const params = new URLSearchParams(searchParams.toString());

    if (data.q) {
      params.set("q", data.q);
    } else {
      params.delete("q");
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  }

  function clearSearch() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.set("page", "1");

    reset({ q: "" });
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="search">Nome ou autor:</Label>
        <div className="flex flex-row gap-2">
          <Input
            id="search"
            type="text"
            placeholder="Título do livro ou autor"
            {...register("q")}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clearSearch}
          >
            <X className="size-4" />
          </Button>
          <Button size="icon" type="submit">
            <SearchIcon className="size-4" />
          </Button>
        </div>
      </div>
    </form>
  );
};
