"use client";

import { Copy } from "lucide-react";
import { Button } from "./ui/button";

interface CopyItemProps {
  value: string;
}

export default function CopyItem({ value }: CopyItemProps) {
  function handleCopy() {
    navigator.clipboard.writeText(value);
  }

  return (
    <Button size="icon" variant="outline" onClick={handleCopy}>
      <Copy className="size-4" />
    </Button>
  );
}
