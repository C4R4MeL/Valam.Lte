import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valam — Platform B2B Minyak Nilam",
  description:
    "Marketplace B2B minyak nilam Aceh dengan Certificate of Analysis dan traceability asal-usul batch.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
