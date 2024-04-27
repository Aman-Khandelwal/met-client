import MetLogo from "@/components/MetLogo";
import { CircleStackIcon, NewspaperIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/router";
import { ReactNode } from "react";


export default function Layout({children}: {children: ReactNode}) {
    const router = useRouter();
    return (
        <div className="m-0 p-0 w-screen h-screen flex flex-col justify-center items-center">
            <div className="sticky top-0 bg-white z-10 pl-10 pb-3 w-full h-fit flex items-center border-4 border-transparent border-b-red-600">
                <MetLogo/>
                <NewspaperIcon title="Random Collection" className="ml-11 mt-3 w-7 h-7 text-black hover:text-gray-500" onClick={() => router.push(`/page/1`)}/>
                <CircleStackIcon title="Your Collection" className="ml-3 mt-3 w-7 h-7 text-black hover:text-gray-500" onClick={() => router.push(`/collection`)}/>
            </div>
            <div className="w-full h-5/6 flex flex-col justify-start items-center">
                {children}
            </div>
        </div>
    )
}
  
  