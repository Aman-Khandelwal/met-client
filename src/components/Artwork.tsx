import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import Image from 'next/image';
import { UserCollectionContext, UserCollectionProvider, capacity } from "@/context/UserCollectionContext";

export default function Artwork({id}: {id: string}) {
    // array of objects id strings stored in global context
    /* @ts-ignore */
    const {userCollection, setUserCollection} = useContext(UserCollectionContext);

    // data is the object fetched from met api
    const [data, setData] = useState({}) as any;
    const [loading, setLoading] = useState(true);
    
    // is this id present in the user collection
    const [present, setPresent] = useState(userCollection.length > 50 || userCollection.includes(id)); 

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
            setUserCollection(userCollection.filter((item: string) => item !== id))
            setPresent(false);
        }
    }

    console.log('artworkData', data)
    return (
        <div> 
            {!loading && ( <>
                {/* @ts-ignore */}
                <Card className="flex flex-row justify-center m-12">
                    {/* @ts-ignore */}
                    <CardHeader className="w-2/5 flex justify-center m-0 shrink-0 rounded-r-none">
                        <Image src={data.primaryImage || "/n-a.jpg"} alt={data.title || "no alt text available"} width={300} height={300} className="h-full w-full object-cover"/>
                    </CardHeader>

                    {/* @ts-ignore */}
                    <CardBody className="w-3/5 p-10 flex flex-col justify-between items-center text-ellipsis">
                        {/* @ts-ignore */}
                        <Typography variant="h3" className="m-2">
                            {data.title}
                        </Typography>

                        {/* @ts-ignore */}
                        <Typography variant="h5" className="m-2">
                            {data.artistDisplayName}
                        </Typography>

                        {/* @ts-ignore */}
                        <Typography variant="subtitle" className="m-2">
                            {data.department}
                        </Typography>
                        {/* @ts-ignore */}
                        <Typography variant="subtitle" className="m-2">
                            {data.medium}
                        </Typography>

                        {/* @ts-ignore */}
                        <Button size="lg" ripple={true} onClick={toggleCollection} disabled={userCollection.length >= capacity && !userCollection.includes(id)}>{!present ? "Add to Collection" : "Remove from Collection"}</Button>
                    </CardBody>
                </Card>
            </>
            )}
        </div>
    )
}