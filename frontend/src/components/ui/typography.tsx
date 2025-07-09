import { ReactNode } from "react";

export function TypographyH1({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h1>
  );
}

export function TypographyH2({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

export function TypographyP({ children }: Readonly<{ children: ReactNode }>) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}
