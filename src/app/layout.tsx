import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Footer } from "@/components/Module/Footer";
import { Poppins, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Module/Navbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://fedorasolution.dev"),
  title: {
    default: "Fedora Software Solution — E-Commerce Engineering Agency",
    template: "%s — Fedora Software Solution",
  },
  description:
    "Fedora is an e-commerce engineering agency building high-performance storefronts, SaaS platforms, and edutech systems for ambitious businesses worldwide.",
  keywords: [
    "e-commerce development",
    "SaaS software",
    "web development agency",
    "edutech platform",
    "order management system",
    "POS software",
    "Next.js agency",
    "Bangladesh software company",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fedorasolution.dev",
    siteName: "Fedora Software Solution",
    title: "Fedora Software Solution — E-Commerce Engineering Agency",
    description:
      "High-performance e-commerce storefronts, SaaS software, and edutech platforms built for scale.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fedora Software Solution",
    description: "E-Commerce Engineering Agency — Built for Scale.",
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <Navbar />

            {children}
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
