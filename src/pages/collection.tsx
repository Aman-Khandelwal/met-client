import Artwork from "@/components/Artwork";
import Layout from "@/components/Layout";
import Username from "@/components/Username";
import { UserCollectionContext } from "@/context/UserCollectionContext";
import { Typography } from "@material-tailwind/react";
import { useContext } from "react";

export default function CollectionPage() {
    /* @ts-ignore */
    const {userCollection, setUserCollection} = useContext(UserCollectionContext);

    return (
        <Layout>
            <Username/>
            {/* Artwork */}
            <div className="p-6 w-full h-fit flex flex-col justify-start items-stretch border-t-8 border-red-400 overflow-y-scroll">
                {userCollection && userCollection.map((id: number) => {
                    return <Artwork key={id} id={id}/>
                })}
            </div>
        </Layout>
    )
}