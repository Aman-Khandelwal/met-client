import { createContext, useEffect, useState } from "react";

export const ObjectIDContext = createContext([]);

export function ObjectIDProvider({children}: {children: React.ReactNode}) {
    const [objectIDs, setObjectIDs] = useState([]) as any;
    const [total, setTotal] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/objects`);
            const data = await res.json();
            setObjectIDs(data.objectIDs);
            setTotal(data.total);
        }
        fetchData();
    }, [])

    return (<>
        {/* @ts-ignore */}
        <ObjectIDContext.Provider value={{objectIDs, setObjectIDs, total, setTotal}}>
            {children}
        </ObjectIDContext.Provider>
    </>
    );
  }