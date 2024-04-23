import Artwork from "@/components/Artwork";
import { ObjectIDContext } from "@/context/ObjectIDContext";
import { Button, IconButton, Input, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CircleStackIcon } from '@heroicons/react/24/outline';
import Layout from "@/components/Layout";

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
        const itemIndex = (Number(pageNo)-1)*10;
        setArtworkData(objectIDs.slice(itemIndex, itemIndex + 9))
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

    return (
        <Layout>
            
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
            <div className="flex flex-col w-1/2 h-fit overflow-y-scroll">
                {artworkData && artworkData.map((id) => {
                    return <Artwork key={id} id={id}/>
                })}
            </div>

            {/* Buttons */}
            <div className="flex mt-5">
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