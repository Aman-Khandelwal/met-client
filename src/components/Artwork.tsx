import { Button, Typography } from "@material-tailwind/react";
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


    return (
        <div> 
            {!loading && (
            <div  className="flex-col justify-center mb-24">
                {/* @ts-ignore */}
                <Typography variant="h4" className="m-2">
                {data.title}
                </Typography>

                {/* @ts-ignore */}
                <Typography variant="h5" className="m-2">
                {data.artistDisplayName}
                </Typography>

                <Image src={data.primaryImage || "/n-a.jpg"} alt={data.title || "no alt text available"} width={300} height={300} className="w-full"/>


                {/* @ts-ignore */}
                <Button size="lg" ripple={true} onClick={toggleCollection} disabled={userCollection.length >= capacity && !userCollection.includes(id)}>{!present ? "Add to Collection" : "Remove from Collection"}</Button>
            </div>)
            }
        </div>
    )
}