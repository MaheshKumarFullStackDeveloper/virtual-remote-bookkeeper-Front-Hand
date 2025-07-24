import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Roboto } from "next/font/google";
import { DM_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LayoutWrapper from "./LayoutWrapper";
import MainLoader from "@/lib/MainLoader";
import Script from 'next/script';
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



  return (
    <Suspense fallback={<MainLoader />}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="google-site-verification" content="oocaexQgETPQ-oFbkCOmrNIQiq9bJca_F8VTuNfGKJM" />
          {/* Google Tag (gtag.js) */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-2S4N955CWB"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2S4N955CWB');
          `}
          </Script>
          {/* Google Tag Manager */}
          <Script id="gtm-init" strategy="afterInteractive">
            {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=GTM-K5DQBPF6'+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K5DQBPF6');
          `}
          </Script>
        </head>
        <body
          className={`${roboto.className} ${poppins.className}  ${dmSans.className}`}
        >
          <LayoutWrapper >
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