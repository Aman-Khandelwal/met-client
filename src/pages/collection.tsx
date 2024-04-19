import Artwork from "@/components/Artwork";
import Layout from "@/components/Layout";
import { UserCollectionContext } from "@/context/UserCollectionContext";
import { Typography } from "@material-tailwind/react";
import { useContext } from "react";

export default function CollectionPage() {
    /* @ts-ignore */
    const {userCollection, setUserCollection} = useContext(UserCollectionContext);

    return (
        <Layout>
            {/* @ts-ignore */}
            <Typography variant="h1" className="m-7">
                User Collection
            </Typography>

            {/* Artwork */}
            { !userCollection.length ? <>Collection Empty</> :(
                <div className="w-full h-1/3">
                    {userCollection.map((id: string) => {
                        return <Artwork key={id} id={id}/>
                    })}
                </div>
            )}
        </Layout>
    )
}