import Layout from "@/components/Layout";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";


export default function Landing() {
  return (
    <Layout>
      {/* @ts-ignore */}
      <div  className="relative overflow-hidden bg-no-repeat text-center h-full flex-1 flex-col justify-center" 
        style={{
          backgroundImage: "url('/img/metBackground.jpeg')", 
          height: "400px" 
        }}>
        <Typography>
          <h2 className="mb-4 text-4xl font-bold p-4">
            The Metropolitan Museum of Art
          </h2>
          <br/>
          <br/>
          <p className="font-bold">
            Welcome to our art appreciation hub! Our site is your gateway to the mesmerizing
            world of The Metropolitan Museum of Art. We've harnessed the power of the MET API
            to bring you an extensive list of artworks that span the ages and genres. 
            Explore the rich tapestry of human creativity, from classical masterpieces to 
            contemporary marvels.
          </p>
          <br/>
          <p className="mb-2 font-bold">
            With our user-friendly website, you can now browse through all your favourite art
            pieces from your home, and learn more about any of them by clicking them. Thats not all -
            you can now also filter the art pieces based on your favourite departments here at The MET,
            and search your favourite artist up as well! Whether you're a seasoned art enthusiast 
            or a curious newcomer, our site invites you to immerse yourself in the beauty and history
            of The Met's collection. Join us on this artistic journey, and let your imagination roam free!
          </p>
          
        </Typography>
        <Link href="/page/1" className="inline-block px-4 py-2 rounded-full border-2 border-white text-white font-bold text-center">Visit Page 1</Link>
        <br/>
        <br/>
        <Link href="/collection" className="inline-block px-4 py-2 rounded-full border-2 border-white text-white font-bold text-center">Visit Your Collection</Link>
      </div>
    </Layout>
      
  );
}

