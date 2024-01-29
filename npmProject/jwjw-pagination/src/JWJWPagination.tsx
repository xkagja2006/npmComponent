import { useEffect, useRef, useState } from "react";

type props = {
  totalListCnt : number,
  perPage : number,  //한페이지에 보여줄 게시글 수 
  paginationsRange : number, //페이지네이션 숫자 범위 
  result: (data: unknown) => void;
};

const JWJWPagination = (props: props) => {
  const [curPage, setCurPage] = useState(1);
  const [result, setResult] = useState([1]);
  const totalPage = Math.ceil(props.totalListCnt/props.perPage);
  const [canNext, setCanNext] = useState(true);
  const [canPrev, setCanPrev] = useState(false);
  
  const setList = () => {
    let listLastIdx = curPage + props.paginationsRange - (curPage % props.paginationsRange) <= totalPage ?
    curPage + props.paginationsRange - (curPage % props.paginationsRange) : totalPage; 

    let listFirstIdx = curPage - (curPage % props.paginationsRange) + 1 >= 1 ? 
    curPage - (curPage % props.paginationsRange) + 1 : 1; 

    if(curPage % props.paginationsRange == 0){
      listLastIdx = curPage;
      listFirstIdx = curPage - props.paginationsRange + 1;
    }
   
    setResult([]);
    
    let tmp = [];
    for (let i = listFirstIdx; i <= listLastIdx; i++) {
      tmp.push(i);
    }
    setResult(tmp);
  };
  
  useEffect(() =>{
    if(curPage <= props.paginationsRange)
      setCanPrev(false);
    else 
      setCanPrev(true);
    if(curPage >= totalPage - props.paginationsRange + 1)
      setCanNext(false);
    else
      setCanNext(true);
    setList();
    props.result({
      curPage : curPage,
      startIdx : (curPage - 1) * props.perPage + 1,
      endIdx : curPage * props.perPage,
    });
  },[curPage])

  const start = () => {
    setCurPage(1);
  }
  
  const prev = () => {
    const newIdx = curPage % props.paginationsRange == 0 ? 
    curPage - props.paginationsRange:
    curPage - (curPage % props.paginationsRange);
    setCurPage(newIdx);
  }

  const next = () => {
    const newIdx = curPage % props.paginationsRange == 0 ? 
    curPage - (curPage % props.paginationsRange) + 1 : 
    curPage + props.paginationsRange - (curPage % props.paginationsRange) + 1
    setCurPage(newIdx);
  }
  
  const end = () => {
    setCurPage(totalPage - props.paginationsRange + 1);
  }

  return (
    <div>
      {canPrev ? (
        <>
          <span onClick={() => start()}> &lt;&lt; </span>
          <span onClick={() => prev()}> &lt; </span>
        </>
        ) : (
        <>
          <span> &lt;&lt; </span>
          <span> &lt; </span>
        </>
      )}
      <ul>
        {result.map((n) => {
          return(
            n==curPage ? (
            <span className="active">{n} </span>
            ) : (
            <span onClick={() => setCurPage(n)}>{n} </span>
            )
          )
        })}
      </ul>
      {canNext ? (
        <>
          <span onClick={() => next()}> &gt; </span>
          <span onClick={() => end()}> &gt;&gt; </span>
        </>
        ) : (
        <>
          <span> &gt; </span>
          <span> &gt;&gt; </span>
        </>
      )}
    </div>
  );
};

export default JWJWPagination;
