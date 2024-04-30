import Artwork from "@/components/Artwork";
import { ObjectIDContext, shuffle } from "@/context/ObjectIDContext";
import { Button, IconButton, Input, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CircleStackIcon } from '@heroicons/react/24/outline';
import Layout from "@/components/Layout";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { UserCollectionContext } from "@/context/UserCollectionContext";

export const pageSize = 10;


export default function Page() {
    const router = useRouter();

    /* @ts-ignore */
    // fetch states from global context
    const {objectIDs, total, shuffledIDs, setShuffledIDs} = useContext(ObjectIDContext);
    const [IDs, setIDs] = useState(shuffledIDs); // array of objectIDs to be used for all pages
    const [searchTerm, setSearchTerm] = useState('');
    const { selectedCollection} = useContext(UserCollectionContext);
    
    const pageNo = Number(router.query.pageNo as string) || 1;
    const [artworkData, setArtworkData] = useState([]); // array of 10 objectIDs to be fetched by the Artwork components

    // slices IDs array to get the new artworkData for the page
    useEffect(() => {
        const itemIndex = (Number(pageNo)-1)*pageSize;
        setArtworkData(IDs.slice(itemIndex, itemIndex + pageSize))
    }, [pageNo, IDs])


    useEffect(() => {
        let isMounted = true;
        
        // fetch objectIDs and total from the search api
        async function fetchData() {
            const res = await fetch(`/api/search/${searchTerm}`);
            const data = await res.json();

            // if the component is still mounted(return function hasn't executed), update the objectIDs and total
            if(data.objectIDs && isMounted) {
                setIDs(data.objectIDs);
            }
        }

        // if there is a search term, fetch the search results, else use random collection
        if(searchTerm.length)
            fetchData();
        else {
            setIDs(shuffledIDs);
        }

        return () => {isMounted = false} // some weird react magic that prevents race condition
    }, [searchTerm, shuffledIDs])


    return (
        <Layout>
            {/* @ts-ignore */}
            <Typography variant="h1" className="m-7">Random Collection</Typography>
            
            {/* @ts-ignore */}
            <Typography color="blue" variant="h3">Current Collection: {selectedCollection}</Typography>

            <div className="w-full flex flex-row mb-5 justify-center items-center text-center">
                {/* Page Title */}
                {/* @ts-ignore */}
                <Typography variant="h5" className="h-1/6 pb-7">Page {pageNo}</Typography>
            
                {/* Search Bar */}
                <div className="m-5 max-w-[200px]">
                    {/* @ts-ignore */}
                    <Input variant="outlined" label="Search" onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>

                {/* @ts-ignore */}
                <IconButton size="lg" className="rounded" color="white" title="Refresh Collection" onClick={() => setShuffledIDs(shuffle(objectIDs))}>
                    <ArrowPathIcon className="m-0 p-0 w-full h-full"/>
                </IconButton>
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