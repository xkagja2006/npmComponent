import React, { useEffect, useRef, useState } from "react";
import {AxiosInstance} from "axios";
import {jwjwSearchApi} from '../api/JWJWSearch';

const JWJWSearchBox = ({BaseApi, getFlag, url, result, fail} : {BaseApi : AxiosInstance, getFlag : Boolean, url : string, result : (data: unknown) => void, fail : (data: unknown) => void}) =>{
    const [param, setParam] = useState("");
    const listRef = useRef<HTMLUListElement>(null);
    const data = ['a', 'b', 'c'];
    const [list, setList] = useState(data);
    const success = (data : unknown) => {
        setList(() => data as string[]);
    }
    const setListString = async() => {
        await jwjwSearchApi(BaseApi, getFlag, url, param, success ,fail);
    }

    useEffect(() => {
        console.log(param);
        setListString();
    },[param])
    
    useEffect(() => {
        for(let a = 0; a < list.length; a++){
            const element = document.createElement('li');
            const textNode = document.createTextNode(list[a]);
            element.appendChild(textNode);
            listRef.current?.appendChild(element);
        }
        return () =>{
            while(listRef.current?.hasChildNodes()){
                if(listRef.current?.firstChild != null)
                    listRef.current?.removeChild(listRef.current.firstChild);
            }
        }
    },[list])

    const returnResult = (e : unknown) => {
        if(e.target !== null && e.target.value === 13)
    }

    return(
        <div className="container">
            <input type="text" onChange={(e) => {setParam(e.target.value)}} onKeyUp={returnResult} value={param} />
            <button>버튼</button>
            <ul ref={listRef}>
                
            </ul>
        </div>
    )
}

export default JWJWSearchBox;