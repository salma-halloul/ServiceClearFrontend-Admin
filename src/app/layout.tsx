//import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import ClientProvider from "@/redux/provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Clear",
  description: "Service Clear",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ClientProvider>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {children}
        </div>
        </ClientProvider>
      </body>
    </html>
  );
}
