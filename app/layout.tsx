import type { Metadata } from "next";

import "./globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'


export const base_url = `http://localhost:3000` 


export const metadata: Metadata = {
  title: "IntraChat AI",
  description: "The chatbot facilitates conversations and interactions among members of the organization, leveraging internal data and context to provide relevant and helpful responses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <ClerkProvider>
      <html lang="en">
        <body className='min-h-screen '>{children}</body>
      </html>
    </ClerkProvider>
  );
}
