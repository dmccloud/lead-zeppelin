import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui";

export const metadata = {
  title: "Lead Zeppelin",
  description: "Cool lead tracking system",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
