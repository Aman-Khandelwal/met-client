import { UserCollectionContext } from "@/context/UserCollectionContext";
import { Button, Input, Typography } from "@material-tailwind/react"
import { useContext, useEffect, useState } from "react"

export default function Username() {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState("");
    /* @ts-ignore */
    const {username, setUsername} = useContext(UserCollectionContext);
    
    
    return (<div className="m-2 w-1/4 justify-center flex items-center">
        {editing ? 
        <form className="m-2"  onSubmit={() => {
            console.log('setting', value)
            setUsername(value);
            setEditing(false);
            console.log('submitted', value, username)
        }}>
            {/* @ts-ignore */}
            <Input size="lg" variant="outlined"  label="Name" value={value} onChange={(e) => setValue(e.target.value)}/> 
        </form>
        : <>
            {/* @ts-ignore */}
            <Typography variant="h1" className="m-7">
                {username}&#39;s Collection
            </Typography> 
        </>
        }
        {/* @ts-ignore */}
        <Button onClick={(e) => {setEditing(!editing)}}>{editing ? "Cancel" : "Edit"}</Button>

    </div>
    )
}