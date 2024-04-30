import { useContext, useState } from "react";
import { UserCollectionContext } from "@/context/UserCollectionContext";
import { Button, Input } from "@material-tailwind/react";

export function AddCollectionForm() {
    const { addCollection } = useContext(UserCollectionContext);
    const [collectionName, setCollectionName] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addCollection(collectionName);
        setCollectionName(""); 
    };

    return (
        <div className="p-4 w-full max-w-xs mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                {/* @ts-ignore */}
                <Input
                    type="text"
                    value={collectionName}
                    onChange={(e) => setCollectionName(e.target.value)}
                    placeholder="Collection Name"
                    color="red"
                    required
                />
                {/* @ts-ignore */}
                <Button type="submit" color="red" className="mt-2">
                    Add Collection
                </Button>
            </form>
        </div>
    );
}
