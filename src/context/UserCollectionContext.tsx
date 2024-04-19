import { createContext, useEffect, useState } from "react";

export const UserCollectionContext = createContext([]);
export const capacity = 30

export function UserCollectionProvider({children}: {children: React.ReactNode}) {
    const [userCollection, setUserCollection] = useState([]);

    // fetch user collection from local storage on mount
    useEffect(() => {
        const storedCollection = localStorage.getItem("userCollection");
        if (storedCollection) {
            setUserCollection(JSON.parse(storedCollection));
        }
    }, []);

    // save user collection to local storage on change
    useEffect(() => {
        if (userCollection.length > 0) {
            localStorage.setItem("userCollection", JSON.stringify(userCollection));
        } else {
            // if userCollection is empty, remove it from local storage
            localStorage.removeItem("userCollection");
        }
    }, [userCollection]);

    return (<>
        {/* @ts-ignore */}
        <UserCollectionContext.Provider value={{userCollection, setUserCollection}}>
            {children}
        </UserCollectionContext.Provider>
    </>
    );
  }