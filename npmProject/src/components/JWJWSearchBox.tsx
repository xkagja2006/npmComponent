import { useEffect, useRef, useState } from "react";

const JWJWSearchBox = () =>{
    const [param, setParam] = useState("");
    const listRef = useRef<HTMLUListElement>(null);
    
    useEffect(() => {
        console.log(param);
    },[param])

    return(
        <div className="container">
            <input type="text" onChange={(e) => {setParam(e.target.value)}} value={param} />
            <button>버튼</button>
            <ul ref={listRef}>
                
            </ul>
        </div>
    )
}

export default JWJWSearchBox;