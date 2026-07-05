import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  title: "BuzzWeight — Smart Apiary Monitoring Hardware & Software",
  description:
    "BuzzWeight combines precision weighing & climate hardware with a real-time dashboard to monitor mobile bee-hive apiaries.",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <Suspense fallback={<div className="h-16 w-full" />}>
                <Navbar />
              </Suspense>
              <main className="flex-1 w-full">{children}</main>
              <Footer />
            </div>
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </LocalizationWrapper>
      </body>
    </html>
  );
}
