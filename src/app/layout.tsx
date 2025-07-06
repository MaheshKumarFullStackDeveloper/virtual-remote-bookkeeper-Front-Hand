import type { Metadata } from "next";
import { Poppins } from "@next/font/google";
import { Roboto } from "@next/font/google";
import { DM_Sans } from "@next/font/google";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LayoutWrapper from "./LayoutWrapper";
import MainLoader from "@/lib/MainLoader";
import { getHeaderFooterWidgets } from "./store/getHeaderFooterWidgets";

import "./globals.css";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";

const dmSans = DM_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: process.env.SEO_TITLE,
  description: process.env.SEO_DES,
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerFooter = await getHeaderFooterWidgets();

  const sanitizedHeaderFooter = {
    headerLogo: headerFooter.headerLogo ?? "",
    footerLogo: headerFooter.footerLogo ?? "",
    footerText: headerFooter.footerText ?? "",
    footerCopywrite: headerFooter.footerCopywrite ?? "",
    headerMenu: headerFooter.headerMenu ?? [],
    footerMenu: headerFooter.footerMenu ?? [],
    headerButton: headerFooter.headerButton ?? null,
    blogCategories: headerFooter.blogCategories ?? null,
  };

  return (
    <Suspense fallback={<MainLoader />}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${poppins.className} ${roboto.className} ${dmSans.className}`}
        >
          <LayoutWrapper initialHeaderFooter={sanitizedHeaderFooter}>
            <Header />
            {children}
            <Footer />
          </LayoutWrapper>
          <ToastContainer />

        </body>
      </html>
    </Suspense>
  );
}