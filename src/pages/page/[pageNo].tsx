import Artwork from "@/components/Artwork";
import { ObjectIDContext } from "@/context/ObjectIDContext";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Page() {
    const router = useRouter();

    /* @ts-ignore */
    const {objectIDs, total} = useContext(ObjectIDContext);
    const [artworkData, setArtworkData] = useState([]);

    const pageNo = Number(router.query.pageNo as string) || 1;


    useEffect(() => {
        async function fetchData() {
            const itemIndex = (Number(pageNo)-1)*10;
            setArtworkData(objectIDs.slice(itemIndex, itemIndex + 9))
        }
        fetchData();
    }, [pageNo, objectIDs])

    return (
    <div className="w-full h-full flex-col justify-center items-center">
        {/* @ts-ignore */}
        <Typography variant="h1" className="w-full h-1/6 mb-20">Page {pageNo}</Typography>
        
        <div className="w-full h-1/3">
            {artworkData.map((id) => {
                return <Artwork key={id} id={id}/>
            })}
        </div>

        <div className="mt-5 flex justify-between">
            {/* @ts-ignore */}
            <IconButton color="white" onClick={() => router.push(`/page/${pageNo-1}`)} disabled={pageNo === 1} className="rounded-full">
                <ArrowLeftIcon className="w-full h-full"/>
            </IconButton>

            {/* @ts-ignore */}
            <IconButton color="white" onClick={() => router.push(`/page/${pageNo+1}`)} disabled={pageNo === Math.ceil(total/10)} className="rounded-full">
                <ArrowRightIcon className="w-full h-full"/>
            </IconButton>
        </div>
    </div>);
}