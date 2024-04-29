import { createContext, useEffect, useState } from "react";

export const ObjectIDContext = createContext([]);

export function shuffle(arr: any[]) {
    let array = [...arr];
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

export function ObjectIDProvider({children}: {children: React.ReactNode}) {
    const [objectIDs, setObjectIDs] = useState([]) as any;
    const [shuffledIDs, setShuffledIDs] = useState([]) as any;
    const [total, setTotal] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/objects`);
            const data = await res.json();
            setObjectIDs(data.objectIDs);
            setShuffledIDs(shuffle(data.objectIDs));
            setTotal(data.total);
        }
        fetchData();
    }, [])

    return (<>
        {/* @ts-ignore */}
        <ObjectIDContext.Provider value={{objectIDs, setObjectIDs, total, setTotal, shuffledIDs, setShuffledIDs}}>
            {children}
        </ObjectIDContext.Provider>
    </>
    );
  }