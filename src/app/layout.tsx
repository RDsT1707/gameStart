"use client";

import "../styles/globals.css";
import { Providers } from "@/store/Provider";
import Header from "./components/Header";
import Footer from "./components/Footer"; 
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-[#1E1E1E] text-white font-ubuntu">
        <SessionProvider>
          <Providers>
            <Header />
            <main 
              className="
                container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[80vh]
                pt-[150px]  /* mobile, menu burger grand */
                sm:pt-[120px] /* petits écrans */
                md:pt-20    /* tablette et plus */
              "
            >
              {children}
            </main>
            <Footer />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
