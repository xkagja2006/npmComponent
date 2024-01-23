import { useEffect, useRef, useState } from "react";
import { AxiosInstance } from "axios";
import { jwjwSearchApi } from "./api/JWJWSearch";
import React from "react";

type props = {
  buttonFlag?: boolean;
  containerClassName?: string;
  baseApi: AxiosInstance;
  getFlag: boolean;
  url: string;
  result: (data: unknown) => void;
  fail?: (data: unknown) => void;
  noDataText?: string;
};

const JWJWSearchBox = (props: props) => {
  const [param, setParam] = useState("");
  const [debouncedParam, setDebouncedParam] = useState("");
  const listRef = useRef<HTMLUListElement>(null);
  const [list, setList] = useState<string[]>([]);
  const success = (data: unknown) => {
    setList(() => data as string[]);
  };

  const requestSearchApi = async () => {
    await jwjwSearchApi(
      props.baseApi,
      props.getFlag,
      props.url,
      debouncedParam,
      success,
      props.fail != null ? props.fail : (error: unknown) => console.log(error)
    );
  };

  //값이 바뀌었을 때 연관검색어 api 요청 보내기
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedParam(param);
    }, 200);

    return () => {
      clearTimeout(timer); //이전의 타이머를 clear
    };
  }, [param]);

  useEffect(() => {
    if (debouncedParam != null && debouncedParam != "") requestSearchApi();
  }, [debouncedParam]);

  //검색어 리스트가 바뀌었을 때 연관검색어를 보여줄 ul 업데이트
  useEffect(() => {
    if (list.length > 0) {
      list.forEach(string => {
        const LiElement = document.createElement("li");
        LiElement.style.cursor = "pointer";
        LiElement.addEventListener("click", () => {
          returnResult(string);
        });
        LiElement.textContent = string;
        listRef.current?.appendChild(LiElement);
      });
    } else if (param != "") {
      //검색어가 있는데 리스트가 비어있을 때 -> 연관된 검색어 결과가 나타나지 않을 때
      const LiElement = document.createElement("li");
      LiElement.textContent = props.noDataText != null ? props.noDataText : "연관 검색어가 없어요";
      listRef.current?.appendChild(LiElement);
    }
    return () => {
      while (listRef.current?.hasChildNodes()) {
        if (listRef.current?.firstChild != null)
          listRef.current?.removeChild(listRef.current.firstChild);
      }
    };
  }, [list]);

  //최종 검색 값을 보내주는 함수
  function returnResult(finalParam: string = param): void {
    finalParam = finalParam.trim();
    if (finalParam == null || finalParam == "") {
      //값이 비어있으면
      alert("값이 비어있어요!");
      return;
    }

    props.result(finalParam);
  }

  return (
    <div
      className={`${
        props.containerClassName != null ? props.containerClassName : "JWJWSearchContainer"
      }`}
    >
      <input
        type="text"
        onChange={e => {
          setParam(e.target.value);
        }}
        onKeyUp={e => {
          if (e.key == "Enter") returnResult();
        }}
        value={param}
      />
      {props.buttonFlag == null || props.buttonFlag ? (
        <button
          onClick={() => {
            returnResult();
          }}
        >
          버튼
        </button>
      ) : null}
      <ul ref={listRef}></ul>
    </div>
  );
};

export default JWJWSearchBox;
