import { useEffect, useRef, useState } from "react";

type props = {
  totalListCnt : number,
  perPage : number,  //한페이지에 보여줄 게시글 수 
  paginationsRange : number, //페이지네이션 숫자 범위 
  result: (data: unknown) => void;
};

const JWJWPagination = (props: props) => {
  const [curPage, setCurPage] = useState("1");
  
  const rendering = () => {
    const lastPage = Math.ceil(props.totalListCnt/props.perPage);
    const result = [];
    for (let i = 1; i <= lastPage; i++) {
      result.push(<span key={i}>{i} </span>);
    }
    return result;
  };

  return (
    <div>
      <span> &lt;&lt; </span>
      <span> &lt; </span>
      <ul>
        {rendering()}
      </ul>
      <span> &gt; </span>
      <span> &gt;&gt; </span>
    </div>
  );
};

export default JWJWPagination;
