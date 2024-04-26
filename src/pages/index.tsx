import Layout from "@/components/Layout";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";

export default function Landing() {
  return (
    <Layout>
      {/* @ts-ignore */}
      <Typography variant="h1" className="m-7">
        The Metropolitan Museum of Art
      </Typography>

      {/* @ts-ignore */}
      <Typography variant="h4" className="m-2">
        Welcome to the MET Archive
      </Typography>

      <Link href="/page/1" className="text-blue-200">Visit Page 1</Link>
      <Link href="/collection" className="text-blue-200">Visit Your Collection</Link>
    </Layout>

  );
}