import { Button, Card, CardBody, CardHeader, MenuItem, Select, Typography } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import Image from 'next/image';
import { UserCollectionContext, capacity } from "@/context/UserCollectionContext";
import { useRouter } from "next/router";

export default function Artwork({id}: {id: number}) {
    const router = useRouter();

    // array of objects id strings stored in global context
    /* @ts-ignore */
    const{collections, setCollections, selectedCollection, setSelectedCollection} = useContext(UserCollectionContext);
    

    // data is the object fetched from met api
    const [data, setData] = useState({}) as any;
    const [loading, setLoading] = useState(true);
    
    // is this id present in the user collection
    const [isPresent, setIsPresent] = useState(false);

    // fetch artwork data on mount
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/artwork/${id}`);
            const data = await res.json();
            setData(data);
            setLoading(false);
            {/* @ts-ignore */}
            if (collections[selectedCollection] && collections[selectedCollection].includes(id)) {
                setIsPresent(true);
            } else {
                setIsPresent(false);
            }
        }
        fetchData();
    }, [id, selectedCollection, collections])

    const toggleCollection = () => {
        let updatedCollections = {...collections};

        if (!isPresent) {
            {/* @ts-ignore */}
            updatedCollections[selectedCollection].push(id);
        } else {
            {/* @ts-ignore */}
            updatedCollections[selectedCollection] = updatedCollections[selectedCollection].filter((item: number) => item !== id);
        }
        setCollections(updatedCollections);
        setIsPresent(!isPresent);
    }

    return (
        <div> 
            {!loading && ( <>
                {/* @ts-ignore */}
                <Card className={`w-full flex flex-row justify-center m-6 p-1 border-opacity-40 border-4  ${data.isHighlight && "border-yellow-700"}`}>
                    {/* @ts-ignore */}
                    <CardHeader className="w-2/5 flex justify-center m-0 shrink-0 rounded-r-none hover:bg-gray-200" onClick={() => router.push(`/artwork/${id}`)}>
                        <Image src={data.primaryImage || "/n-a.jpg"} alt={data.title || "no alt text available"} fill={true} style={{objectFit: "contain"}} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                    </CardHeader>

                    {/* @ts-ignore */}
                    <CardBody className="w-3/5 p-10 flex flex-col justify-between items-center">
                        <div className="w-full flex flex-row justify-center items-center">
                            {/* @ts-ignore */}
                            <Typography variant="small" className="m-2">
                                Title
                            </Typography>
                            
                            {/* @ts-ignore */}
                            <Typography variant="h3" className="m-2">
                                {data.title || "N/A"}
                            </Typography>
                        </div>
                        <div className="w-full flex flex-row justify-center items-center">
                            {/* @ts-ignore */}
                            <Typography variant="small" className="m-2">
                                Artist Name
                            </Typography>
                            
                            {/* @ts-ignore */}
                            <Typography variant="h5" className="m-2">
                                {data.artistDisplayName || "N/A"}
                            </Typography>
                        </div>
                        <div className="w-full flex flex-row justify-center items-center">
                            {/* @ts-ignore */}
                            <Typography variant="small" className="m-2">
                                Department
                            </Typography>
                        
                            {/* @ts-ignore */}
                            <Typography variant="h6" className="m-2">
                                {data.department || "N/A"}
                            </Typography>
                        </div>
                        <div className="w-full flex flex-row justify-center items-center">
                            {/* @ts-ignore */}
                            <Typography variant="small" className="m-2">
                                Medium
                            </Typography>
                        
                            {/* @ts-ignore */}
                            <Typography variant="h6" className="m-2">
                                {data.medium || "N/A"}
                            </Typography>
                        </div>

                        {/* @ts-ignore */}
                        <Button size="lg" ripple={true} onClick={toggleCollection}>{!isPresent ? "Add to Collection" : "Remove from Collection"}</Button>
                    </CardBody>
                </Card>
            </>
            )}
        </div>
    )
}