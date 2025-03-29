import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Time",
  description: "TIME (Technology Intelligence Machine Efficiency)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
        {children}

        </Suspense>

        <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                className: ' toast',
                 style: {
                   border: '1px solid #1e293b',
                   padding: '16px',
                   color: ' white',
                   backgroundColor: '#27272a',
                   fontSize: '.8rem'
                 },
                 success: {
                  style: {
                    
                  },
                },
              }}
              
            />
      </body>
    </html>
  );
}
