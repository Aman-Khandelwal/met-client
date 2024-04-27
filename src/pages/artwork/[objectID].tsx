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
    console.log('id', id)

    // array of objects id strings stored in global context
    /* @ts-ignore */
    const {userCollection, setUserCollection} = useContext(UserCollectionContext);

    // data is the object fetched from met api
    const [data, setData] = useState({}) as any;
    const [loading, setLoading] = useState(true);
    
    // is this id present in the user collection
    const [present, setPresent] = useState(userCollection.length > 50 || userCollection.includes(id)); 
    console.log('present', present, userCollection)

    // fetch artwork data on mount
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/artwork/${id}`);
            const data = await res.json();
            setData(data);
            setLoading(false);
        }
        fetchData();
    }, [id])

    const toggleCollection = () => {
        // add id to user collection if it's not already present and there is room
        if(userCollection.length < capacity && !userCollection.includes(id)){
            setUserCollection([...userCollection, id]);
            setPresent(true);
        }
        // remove id from user collection if it's present
        else if(userCollection.includes(id)){
            setUserCollection(userCollection.filter((item: number) => item !== id))
            setPresent(false);
        }
    }
    console.log('data', data)
    return (
        <Layout> 
            {!loading && ( <>
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
                        <Button size="lg" ripple={true} onClick={toggleCollection} disabled={userCollection.length >= capacity && !userCollection.includes(id)}>{!present ? "Add to Collection" : "Remove from Collection"}</Button>
                    </CardBody>
                </Card>
            </>
            )}
        </Layout>
    )
}