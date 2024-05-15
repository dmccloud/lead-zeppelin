import Link from "next/link";
import { TbZeppelinFilled } from "react-icons/tb";

export const metadata = {
  title: "Lead Zeppelin | Dashboard",
  description: "See the data",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex h-14 w-full items-center px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="/">
          <TbZeppelinFilled className="h-6 w-6" />
          <span className="sr-only">Lead Tracker</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="/dashboard"
          >
            Get Started
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      {children}
    </>
  );
}
