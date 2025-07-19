import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Notehub is a web app that helps you create and organise notes.",
  openGraph: {
    title: "NoteHub",
    description:
      "Notehub is a web app that helps you create and organise notes.",
    url: `https://notehub.com/`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub app interface preview with sticky notes and handwritten text elementsNoteHub ",
      },
    ],
    type: "article",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {modal}
            {children}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
