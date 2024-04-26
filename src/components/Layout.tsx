import MetLogo from "@/components/MetLogo";
import { CircleStackIcon, NewspaperIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/router";
import { ReactNode } from "react";


export default function Layout({ children }: { children: ReactNode }) {
    const router = useRouter();
    return (
      <div className="m-0 p-0 w-screen h-screen flex flex-col justify-center items-center">
        <div className="pl-10 w-full h-1/6 flex justify-center items-center border-4 border-transparent border-b-red-600 text-center relative">
          <MetLogo />
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <NewspaperIcon
              title="Random Collection"
              className="ml-3 w-7 h-7 text-black hover:text-gray-500 cursor-pointer"
              onClick={() => router.push(`/page/1`)}
            />
            <CircleStackIcon
              title="Your Collection"
              className="ml-3 w-7 h-7 text-black hover:text-gray-500 cursor-pointer"
              onClick={() => router.push(`/collection`)}
            />
          </div>
        </div>
        <div className="flex-grow w-full h-full flex flex-col justify-start items-center">
          {children}
        </div>
      </div>
    );
  }
  
  