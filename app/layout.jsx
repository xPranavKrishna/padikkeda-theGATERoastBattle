import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "പഠിക്കെടാ 🔥 GATE 2027 Roast Battle",
  description: "Study. Compete. Get roasted. The 132-day battle arena for GATE CSE 2027 aspirants.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ml" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;800&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

