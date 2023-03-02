import React from "react";

function Pagination({currentPage,prevPageFun,nextPageFun}){
    return(
        <>
            <button className="prev-btn" onClick={nextPageFun}>Next</button>
            <p className="page-no">{currentPage}</p>
            <button className="next-btn" onClick={prevPageFun}>Prev</button>
        </>
    );
}

export default Pagination;