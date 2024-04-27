import Artwork from "@/components/Artwork";
import { ObjectIDContext } from "@/context/ObjectIDContext";
import { Button, IconButton, Input, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CircleStackIcon } from '@heroicons/react/24/outline';
import Layout from "@/components/Layout";

export const pageSize = 10;

export default function Page() {
    const router = useRouter();

    /* @ts-ignore */
    // get objectids and total from global context
    const {objectIDs, total, setObjectIDs, setTotal} = useContext(ObjectIDContext);

    const [artworkData, setArtworkData] = useState([]); // the array of objectIDs to be fetched by the Artwork component
    const [searchTerm, setSearchTerm] = useState('');

    const pageNo = Number(router.query.pageNo as string) || 1;

    // slices objectIDs array to get the new artworkData for the page
    useEffect(() => {
        const itemIndex = (Number(pageNo)-1)*pageSize;
        setArtworkData(objectIDs.slice(itemIndex, itemIndex + pageSize))
    }, [pageNo, objectIDs])


    // fetch objectIDs and total from the api
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

        // if there is a search term, fetch the search results, else fetch all objects
        if(searchTerm.length)
            fetchData(`/api/search/${searchTerm}`);
        else {
            fetchData(`/api/objects`);
        }

        return () => {isMounted = false} // some weird react magic that prevents race condition
    }, [searchTerm, setObjectIDs, setTotal])
    console.log('artworkData', artworkData, typeof artworkData[0], artworkData.length)
    return (
        <Layout>
            {/* @ts-ignore */}
            <Typography variant="h1" className="m-7">Random Collection</Typography>
            
            <div className="flex flex-row mb-5 justify-center items-center text-center">
                {/* Page Title */}
                {/* @ts-ignore */}
                <Typography variant="h5" className="w-full h-1/6 pb-7">Page {pageNo}</Typography>
            
                {/* Search Bar */}
                <div className="m-5 max-w-[200px]">
                    {/* @ts-ignore */}
                    <Input variant="outlined" label="Search" onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
            </div>
            
            {/* Artwork */}
            <div className="p-6 w-full h-fit flex flex-col justify-start items-stretch border-t-8 border-red-400 overflow-y-scroll">
                {artworkData && artworkData.map((id: number) => {
                    return <Artwork key={id} id={id}/>
                })}
            </div>

            {/* Buttons */}
            <div className="flex mt-5 bottom-0 sticky">
                {/* @ts-ignore */}
                <IconButton className="mr-5 rounded-full" color="white" onClick={() => router.push(`/page/${pageNo-1}`)} disabled={pageNo === 1}>
                    <ArrowLeftIcon className="w-full h-full"/>
                </IconButton>

                {/* @ts-ignore */}
                <IconButton className="ml-5 rounded-full" color="white" onClick={() => router.push(`/page/${pageNo+1}`)} disabled={pageNo === Math.ceil(total/10)}>
                    <ArrowRightIcon className="w-full h-full"/>
                </IconButton>
            </div>
        </Layout>
    );
}