import Image from "next/image";
import Link from "next/link";
import { FaCalendar, FaClipboard, FaMountain, FaUsers } from "react-icons/fa";
import { FiPieChart } from "react-icons/fi";
import { TbZeppelinFilled } from "react-icons/tb";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex min-h-[100dvh] flex-col">
        <header className="flex h-14 items-center px-4 lg:px-6">
          <Link className="flex items-center justify-center" href="#">
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
        <div className="flex flex-col">
          <section className="w-full py-20 md:py-24 lg:py-24 xl:py-24">
            <div className="px-4 md:px-16">
              <div className="flex w-full flex-col justify-between gap-6  sm:flex-row ">
                <div className="flex w-full flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Streamline Your Sales Leads
                    </h1>
                    <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                      Our lead tracking system helps you stay on top of your
                      sales pipeline, with powerful features to manage and
                      nurture your leads.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link
                      className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                      href="#"
                    >
                      Get Started
                    </Link>
                    <Link
                      className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                      href="#"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="flex w-full items-center justify-center">
                  <Image
                    alt="Hero"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                    height="400"
                    src="/placeholder.webp"
                    width="400"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="w-full bg-gray-100 py-12 md:py-24 lg:py-32 dark:bg-gray-800">
            <div className=" px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                      Key Features
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                      Powerful Lead Management
                    </h2>
                    <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                      Our lead tracking system provides a comprehensive set of
                      tools to help you manage your sales pipeline, from lead
                      capture to conversion.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col items-start space-y-2">
                    <FaClipboard className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    <h3 className="text-lg font-semibold">Lead Capture</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Easily capture and qualify new leads from your website or
                      marketing campaigns.
                    </p>
                  </div>
                  <div className="flex flex-col items-start space-y-2">
                    <FaCalendar className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    <h3 className="text-lg font-semibold">
                      Pipeline Management
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Track the progress of your leads through the sales funnel
                      with customizable stages.
                    </p>
                  </div>
                  <div className="flex flex-col items-start space-y-2">
                    <FaUsers className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    <h3 className="text-lg font-semibold">Lead Nurturing</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Automate your lead nurturing process with email campaigns
                      and task reminders.
                    </p>
                  </div>
                  <div className="flex flex-col items-start space-y-2">
                    <FiPieChart className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    <h3 className="text-lg font-semibold">
                      Reporting & Analytics
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Gain valuable insights into your sales performance with
                      detailed reports and dashboards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className=" grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Why Choose Our Lead Tracking System?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our lead tracking system is designed to help you streamline
                  your sales process and close more deals.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col items-center space-y-2">
                  <FaClipboard className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  <h3 className="text-lg font-semibold">Easy Lead Capture</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Quickly and easily capture new leads from your website or
                    marketing campaigns.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <FaCalendar className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  <h3 className="text-lg font-semibold">
                    Streamlined Pipeline
                  </h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Manage your sales pipeline with customizable stages and
                    automated workflows.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <FaUsers className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  <h3 className="text-lg font-semibold">Effective Nurturing</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Nurture your leads with automated email campaigns and task
                    reminders.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <FiPieChart className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  <h3 className="text-lg font-semibold">
                    Insightful Analytics
                  </h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Gain valuable insights into your sales performance with
                    detailed reports and dashboards.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 Lead Tracker. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:ml-auto sm:gap-6">
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </main>
  );
}
