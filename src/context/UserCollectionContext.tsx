import { createContext, useEffect, useState } from "react";

// Initializing context with a default value
export const UserCollectionContext = createContext({
    collections: {},
    setCollections: (collections: any) => {},
    addCollection: (name: string) => {},
    selectedCollection: 'Default',
    setSelectedCollection: (name: string) => {},
    username: "User",
    setUsername: (name: string) => {}
});
export const capacity = 30;


export function UserCollectionProvider({children}: {children: React.ReactNode}) {
    const [collections, setCollections] = useState<{[key: string]: number[]}>({ "Default": [] });
    const [selectedCollection, setSelectedCollection] = useState("Default");
    const [username, setUsername] = useState("User");

    // Function to add a new collection
    const addCollection = (name: string) => {
        if (!collections[name]) {
            setCollections(prevCollections => ({
                ...prevCollections,
                [name]: []
            }));
        } else {
            console.error("Collection already exists!");
        }
    };

    // Fetch user data from local storage on mount
    useEffect(() => {
        const storedCollections = localStorage.getItem("collections");
        const storedSelectedCollection = localStorage.getItem("selectedCollection");
        const storedUsername = localStorage.getItem("username");

        if (storedCollections) {
            setCollections(JSON.parse(storedCollections));
        }
        if (storedSelectedCollection) {
            setSelectedCollection(storedSelectedCollection);
        }
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    // Save collections and selected collection to local storage on changes
    useEffect(() => {
        if(Object.keys(collections).length > 1 || collections["Default"].length > 0)  {
            localStorage.setItem("collections", JSON.stringify(collections));
            localStorage.setItem("selectedCollection", selectedCollection);
        }
    }, [collections, selectedCollection]);

    
    // Save username to local storage when it changes
    useEffect(() => {
        if (username !== "User") {
            localStorage.setItem("username", username);
        }
    }, [username]);

    return (
        <UserCollectionContext.Provider value={{
            collections,
            setCollections,
            addCollection,
            selectedCollection,
            setSelectedCollection,
            username,
            setUsername
        }}>
            {children}
        </UserCollectionContext.Provider>
    );
}
