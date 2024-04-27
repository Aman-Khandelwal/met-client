import { createContext, useEffect, useState } from "react";

export const UserCollectionContext = createContext([]);
export const capacity = 30

export function UserCollectionProvider({children}: {children: React.ReactNode}) {
    const [userCollection, setUserCollection] = useState([]);
    const [username, setUsername] = useState("User");

    // fetch user collection and name from local storage on mount
    useEffect(() => {
        const storedCollection = localStorage.getItem("userCollection");
        if (storedCollection) {
            setUserCollection(JSON.parse(storedCollection));
        }

        const storedUsername = localStorage.getItem("username");
        console.log('storedUsername', storedUsername)
        if (storedUsername) {
            setUsername(storedUsername);
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

    useEffect(() => {
        console.log('saving', username)
        if(username.length > 0 && username !== "User")
        localStorage.setItem("username", username);
    }, [username])

    return (<>
        {/* @ts-ignore */}
        <UserCollectionContext.Provider value={{userCollection, setUserCollection, username, setUsername}}>
            {children}
        </UserCollectionContext.Provider>
    </>
    );
  }