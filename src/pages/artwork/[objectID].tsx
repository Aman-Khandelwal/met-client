import Layout from "@/components/Layout";
import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import Image from 'next/image';
import { UserCollectionContext, capacity } from "@/context/UserCollectionContext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ArtworkPage() {
    const router = useRouter();
    const id = Number(router.query.objectID as string) || 1;

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
        <Layout> 
            {!loading && ( <>
            {/* @ts-ignore */}
            <Typography color="blue" variant="h3">Current Collection: {selectedCollection}</Typography>
                {/* @ts-ignore */}
                
                <Card className="w-full h-full flex flex-col justify-center  items-center m-12">
                    {/* @ts-ignore */}
                    <CardHeader className="w-fit h-fit flex justify-center">
                        <Image src={data.primaryImage || data.primaryImageSmall || "/n-a.jpg"} alt={data.title || "no alt text available"} width={500} height={500} style={{objectFit: "contain"}}/>
                    </CardHeader>

                    {/* @ts-ignore */}
                    <CardBody className="w-full p-10 flex flex-col justify-between items-center overflow-scroll text-ellipsis">
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
                                Artist Bio
                            </Typography>
                            
                            {/* @ts-ignore */}
                            <Typography variant="h6" className="m-2">
                                {data.artistDisplayBio || "N/A"}
                            </Typography>
                        </div>
                        <div className="w-full flex flex-row justify-center items-center">
                            {/* @ts-ignore */}
                            <Typography variant="small" className="m-2">
                                Artist Nationality
                            </Typography>
                            
                            {/* @ts-ignore */}
                            <Typography variant="h6" className="m-2">
                                {data.artistNationality || "N/A"}
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

                        <div className="w-full flex flex-row justify-center items-center">
                            {/* @ts-ignore */}
                            <Typography variant="small" className="m-2">
                                Begin-End Date
                            </Typography>

                            {/* @ts-ignore */}
                            <Typography variant="h6" className="m-2">
                                {`${data.objectBeginDate || "N/A"} - ${data.objectEndDate || "N/A"}`}
                            </Typography>
                        </div>

                        <div className="w-full flex flex-row justify-center items-center">
                            {/* @ts-ignore */}
                            <Typography variant="small" className="m-2">
                                Gallery Number
                            </Typography>

                            {/* @ts-ignore */}
                            <Typography variant="h6" className="m-2">
                                {data.GalleryNumber || "N/A"}
                            </Typography>
                        </div>

                        <div className="w-full flex flex-row justify-center items-center">
                            {/* @ts-ignore */}
                            <Typography variant="small" className="m-2">
                                Accesion Number
                            </Typography>

                            {/* @ts-ignore */}
                            <Typography variant="h6" className="m-2">
                                {data.accesionNumber || "N/A"}
                            </Typography>
                        </div>




                        {/* @ts-ignore */}
                        <Typography variant="h6" className="m-2">
                            {data.isHighlight ? "This work is a MET Highlight" : "This work is not a MET Highlight"}
                        </Typography>

                        {/* @ts-ignore */}
                        <Link href={data.objectURL} className="m-2 text-blue-500 underline hover:text-purple-200 ">View on MET</Link>
                        {/* @ts-ignore */}
                        <Button size="lg" ripple={true} onClick={toggleCollection}>{!isPresent ? "Add to Collection" : "Remove from Collection"}</Button>
                    </CardBody>
                </Card>
            </>
            )}
        </Layout>
    )
}