import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ProductsProvider } from "./context/ProductsContext";

const poppins = Poppins({ weight: ['200', '300', '400', '500', '600'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: "CRUD Go API",
  description: "Generated by Alex Arraga, using Docker, MongoDB and Golang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster richColors />
        <ProductsProvider>
          {children}
        </ProductsProvider>
      </body>
    </html>
  );
}
