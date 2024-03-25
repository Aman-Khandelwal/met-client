import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function Artwork(props: any) {
    const [data, setData] = useState({}) as any;
    const [loading, setLoading] = useState(true);

    // console.log('artwork', data)
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/artwork/${props.id}`);
            const data = await res.json();
            setData(data);
            setLoading(false);
        }
        fetchData();
    }, [props.id])

    return (
        <div> 
            {!loading && <div  className="flex-col justify-center mb-24">

            {/* @ts-ignore */}
            <Typography variant="h4" className="m-2">
               {data.title}
            </Typography>

            {/* @ts-ignore */}
            <Typography variant="h5" className="m-2">
               {data.artistDisplayName}
            </Typography>

            <Image src={data.primaryImage || "/n-a.jpg"} alt={data.title || "no alt text available"} width={300} height={300} className="w-full"/>
            </div>
            }
        </div>
    )
}