import React from "react";
import JWJWPagination from "./JWJWPagination";

function App() {
  return (
    <div className="App">
        <JWJWPagination totalListCnt={100} perPage={10} paginationsRange={10} result={function (data: unknown): void {
throw new Error("Function not implemented.");
} }/>
    </div>
  );
}

export default App;