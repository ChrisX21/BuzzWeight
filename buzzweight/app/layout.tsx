import { Montserrat } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";
import { Suspense } from "react";
import LocalizationWrapper from "@/components/localization-wrapper";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "BuzzWeight",
  description: "Your pollen production line monitoring solution",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "500",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <LocalizationWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen flex flex-col items-center">
              <div className="flex-1 w-full flex flex-col gap-20 items-center">
                <Suspense fallback={<div>Loading...</div>}>
                  <Navbar />
                </Suspense>
                <div className="flex flex-col gap-20 max-w-5xl p-5">
                  {children}
                </div>
                <Footer />
              </div>
            </main>
          </ThemeProvider>
        </LocalizationWrapper>
      </body>
    </html>
  );
}
