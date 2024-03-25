import MetLogo from "@/components/MetLogo";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="container">
      <MetLogo />
      
      {/* @ts-ignore */}
      <Typography variant="h1" className="m-7">
        The Metropolitan Museum of Art
      </Typography>
      
      {/* @ts-ignore */}
      <Typography variant="h4" className="m-2">
        Welcome to the MET Archive
      </Typography>

      <Link href="/page/1" className="text-blue-200">Visit Page 1</Link>
    </div>
  );
}
