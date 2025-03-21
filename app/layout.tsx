import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ayron Rivero | Software Developer",
  description:
    "Software Developer com mais de 5 anos de experiência, especializado em WordPress, Angular, React, Next.js e Strapi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png"/>
        <link rel="apple-touch-icon" href="/favicon.png"/>

        <meta property="og:title" content="Ayron Rivero | Software Developer" />
        <meta property="og:description" content="Software Developer com mais de 5 anos de experiência, especializado em WordPress, Angular, React, Next.js e Strapi."/>
        <meta property="og:image" content="/thumb.png"/> 
        <meta property="og:url" content="https://ayronrivero.vercel.app/"/> 
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Ayron Rivero"/>
        <meta name="twitter:title" content="Ayron Rivero | Software Developer"/>
        <meta name="twitter:description" content="Software Developer com mais de 5 anos de experiência, especializado em WordPress, Angular, React, Next.js e Strapi."/>
        <meta name="twitter:image" content="/thumb.png"/>
        <meta name="twitter:card" content="summary_large_image"/>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.body.style.backgroundColor = 'hsl(0 0% 100%)';
                } else {
                  document.documentElement.classList.add('dark');
                  document.body.style.backgroundColor = 'hsl(240 10% 3.9%)';
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
