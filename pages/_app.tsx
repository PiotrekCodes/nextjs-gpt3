import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Lato } from "@next/font/google";
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${lato.className} bg-slate-900 min-h-screen`}>
      <Component {...pageProps} />
    </main>
  );
}
