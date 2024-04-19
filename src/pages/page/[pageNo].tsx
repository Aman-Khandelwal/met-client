import Artwork from "@/components/Artwork";
import { ObjectIDContext } from "@/context/ObjectIDContext";
import { Button, IconButton, Input, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CircleStackIcon } from '@heroicons/react/24/outline'
import MetLogo from "@/components/MetLogo";
import Layout from "@/components/Layout";

export default function Page() {
    const router = useRouter();

    /* @ts-ignore */
    // get objectids and total from global context
    const {objectIDs, total, setObjectIDs, setTotal} = useContext(ObjectIDContext);

    const [artworkData, setArtworkData] = useState([]); // the array of objectIDs to be fetched by the Artwork component
    const [searchTerm, setSearchTerm] = useState('');

    const pageNo = Number(router.query.pageNo as string) || 1;

    useEffect(() => {
        async function fetchData() {
            const itemIndex = (Number(pageNo)-1)*10;
            setArtworkData(objectIDs.slice(itemIndex, itemIndex + 9))
        }
        fetchData();
    }, [pageNo, objectIDs])


    useEffect(() => {
        let isMounted = true;

        async function fetchData(url: string) {
            const res = await fetch(url);
            const data = await res.json();

            // if the component is still mounted(return function hasn't executed), update the objectIDs and total
            if(data.objectIDs && isMounted) {
                setObjectIDs(data.objectIDs);
                setTotal(data.total);
            }
        }

        if(searchTerm.length)
            fetchData(`/api/search/${searchTerm}`);
        else {
            fetchData(`/api/objects`);
        }

        return () => {isMounted = false} // some weird react magic that prevents race condition
    }, [searchTerm, setObjectIDs, setTotal])

    return (
        <Layout>
            {/* Search Bar */}
            <div className="m-5 max-w-[200px]">
                {/* @ts-ignore */}
                <Input variant="outlined" label="Search" onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            
            <CircleStackIcon className="w-10 h-10 text-black hover:text-gray-500" onClick={() => router.push(`/collection`)}/>

            {/* Page Title */}
            {/* @ts-ignore */}
            <Typography variant="h1" className="w-full h-1/6 mb-20">Page {pageNo}</Typography>
            
            {/* Artwork */}
            <div className="w-full h-1/3">
                {artworkData.map((id) => {
                    return <Artwork key={id} id={id}/>
                })}
            </div>

            {/* Buttons */}
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
        </Layout>
    );
}