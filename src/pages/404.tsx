import Layout from "@/components/Layout";
import { Typography } from "@material-tailwind/react";

export default function Error404() {
  return (
    <Layout>
      {/* @ts-ignore */}
      <Typography variant="h1" className="m-7">
        Error 404
      </Typography>
      
      {/* @ts-ignore */}
      <Typography variant="h4" className="m-2">
        Page Not Found
      </Typography>

    </Layout>
      
  );
}
