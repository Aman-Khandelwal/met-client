import { useContext, useState } from "react";
import { UserCollectionContext } from "@/context/UserCollectionContext";
import Layout from "@/components/Layout";
import Username from "@/components/Username";
import Artwork from "@/components/Artwork";
import { AddCollectionForm } from "@/components/AddCollectionModal";
import { Typography, Button } from "@material-tailwind/react";

export default function CollectionPage() {
    const { collections, selectedCollection, setSelectedCollection } = useContext(UserCollectionContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleCollectionSelect = (collectionName: string) => {
        setSelectedCollection(collectionName);
        toggleDropdown();
    };

    return (
        <Layout>
            <div className="flex flex-row justify-center">


            <Username />
            <div className="m-5 w-1/2 flex flex-col justify-center items-center">
                <AddCollectionForm />

                <div className="p-6">
                    <div className="relative">
                        {/* @ts-ignore */}
                        <Button color="red" onClick={toggleDropdown} className="p-4">
                            {selectedCollection} ▼
                        </Button>
                        {dropdownOpen && (
                            <div className="absolute top-full left-0 right-0 bg-white shadow-lg mt-1">
                                {Object.keys(collections).map((key) => (
                                    <div
                                    key={key}
                                    onClick={() => handleCollectionSelect(key)}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {key}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {/*current collection name*/  }
                {/* @ts-ignore */}
                <Typography color="red" variant="h3">Current Collection: {selectedCollection}</Typography>
            </div>
            </div>
            <div className="p-6 w-full h-fit flex flex-col justify-start items-stretch border-t-8 border-red-400 overflow-y-scroll">
                {/* @ts-ignore */}
                {collections[selectedCollection] && collections[selectedCollection].map((id: number) => {
                    return <Artwork key={id} id={id}/>
                })}
            </div>
        </Layout>
    );
}
