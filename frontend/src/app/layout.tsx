import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Acervo em Margem",
  description: "Coleção de livros que celebram a diversidade.",
};

type NavigationMenuItem = {
  id: number;
  title: string;
  href: string;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigationMenuItems: NavigationMenuItem[] = [
    {
      id: 1,
      title: "Livros",
      href: "/",
    },
    {
      id: 2,
      title: "Autores",
      href: "/authors",
    },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-full p-8 flex justify-center items-center flex-col`}
      >
        <NavigationMenu className="mb-8">
          <NavigationMenuList>
            {navigationMenuItems.map((item) => (
              <NavigationMenuItem key={item.id}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={item.href}>{item.title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
