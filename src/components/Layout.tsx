import MetLogo from "@/components/MetLogo";
import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {
    return (
        <div className="m-0 p-0 w-full h-full flex flex-col justify-center items-center">
            <div className="p-5 w-full h-1/6 flex justify-center items-center">
                <MetLogo/>
            </div>
            <div className="w-full h-5/6 flex flex-col justify-center items-center">
                {children}
            </div>
        </div>
    )
}