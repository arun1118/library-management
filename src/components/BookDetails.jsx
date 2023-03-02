import React,{useState} from "react";
import Loading from "./Loading";
import Pagination from "./Pagination";

function BookDetails({allBooks,isLoading,headingText}){
    const [currentPage,setCurrentPage]=useState(1);

    if(typeof(allBooks[0])==='string'){
        let totalLen=Object.keys(allBooks).length;
        if(isLoading===0) return(<></>);
        else if(isLoading===1) return(<Loading/>)
        else return(
        <div className="main-content">
            {totalLen>0 ? 
            <>
            <h3 className="heading-text">{headingText}</h3>
            <ul className="list">
                {
                    allBooks.map((book,idx)=>{
                        return <li key={idx} className="list-items">{book}</li>
                    })
                }
            </ul>
            </>
            : <></>}
        </div>
    );
    }

    else{
    const postsPerPage=10;
    // const [postsPerPage,setPostsPerPage]=useState(10);

    const lastPostIdx=currentPage * postsPerPage;
    const firstPostIdx=lastPostIdx-postsPerPage;
    const booksToDisplay=allBooks.slice(firstPostIdx,lastPostIdx);

    let totalLen=Object.keys(allBooks).length;
    let displayLen=Object.keys(booksToDisplay).length;
    let pagesPossible=totalLen/postsPerPage;

    function nextPageFun(){
        if(currentPage+1<=pagesPossible) setCurrentPage(currentPage+1);
    }
    function prevPageFun(){
        if(currentPage-1>=1) setCurrentPage(currentPage-1);
    }

    if(isLoading===0) return(<></>);
    else if(isLoading===1) return(<Loading/>)
    else return(
        <div className="main-content">
            {displayLen>0 ? 
            <>
            <h3 className="heading-text">{headingText}</h3>
            <table>
                <tbody>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Latest Publish</th>
                    <th>First Publish</th>
                </tr>
                {
                booksToDisplay.map((book,idx)=>{
                    return(
                        <tr key={idx}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.latest_publish}</td>
                            <td>{book.first_publish}</td>
                        </tr>
                    );
                })
                }
                </tbody>
            </table>

            <Pagination
            nextPageFun={nextPageFun}
            prevPageFun={prevPageFun}
            currentPage={currentPage}
            />
            </>
            : <h2 className="invalid-search">Invalid Search!!</h2>}
        </div>
    );
    }
}

export default BookDetails;
