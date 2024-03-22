import { ObjectIDProvider } from "@/context/ObjectIDContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <ObjectIDProvider><Component {...pageProps} /></ObjectIDProvider>;
}
