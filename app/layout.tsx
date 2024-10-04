import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SignIn from "@/app/components/sign-in";
import SignOut from "@/app/components/sign-out";

import { auth } from "@/auth"


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
  title: "Watch Tonight",
  description: "Tinking with AI to find what to watch",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth()



  if (!session?.user) return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
        </head>

        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold mb-4">Watch Tonight</h1>
          <SignIn />
        </div>



      </body>
    </html>
  )

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}>

        <header className="flex items-center justify-between w-full bg-white px-4 py-1 shadow sticky top-0 z-50">
          <div className="flex-1"></div>
          <h1 className="text-xl font-bold">Watch Tonight</h1>
          <div className="flex-1 flex justify-end">
            <SignOut />
          </div>
        </header>

        <div >
          {children}
        </div>



      </body>
    </html>
  );
}
