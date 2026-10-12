import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Meeting Scheduling Software and AI Meeting Tools | Calendly",
  description:
    "From AI-powered scheduling to automated meeting recaps and follow-ups, get the busywork done with fewer tools and less effort.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
