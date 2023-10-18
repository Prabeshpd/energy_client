import "../stylesheets/application.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ToastContainerWrapper } from "./toastContainerWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Energy",
  description: "Energy Consumption"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainerWrapper />
        {children}
      </body>
    </html>
  );
}
