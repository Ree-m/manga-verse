"use client";
import "./styles/globals.css";
import Header from "./components/Header";
import { UserContextProvider } from "./context/user";
import { SessionProvider } from "next-auth/react";
import { BookmarkContextProvider } from "./context/bookmark";
import { CommentContextProvider } from "./context/comment";
import Genres from "./components/Genres";
import Footer from "./components/Footer";
import CarouselComponent from "./components/CarouselComponent";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Manga Verse</title>
      </head>

      <body className="body">
        <SessionProvider>
          <UserContextProvider>
            <BookmarkContextProvider>
              <CommentContextProvider>
                <Header />
                <main>
                  {children}
                  <ProgressBar
                    height="4px"
                    color="#3498db"
                    options={{ showSpinner: false }}
                    shallowRouting
                  />
                </main>
                <Genres />
                <Footer />
              </CommentContextProvider>
            </BookmarkContextProvider>
          </UserContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
