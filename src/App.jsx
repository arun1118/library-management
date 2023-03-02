import React, { useState } from "react";
import SubjectSearch from "./components/SubjectSearch";
import Search from "./components/Search";
import BookDetails from "./components/BookDetails";

function App(){
    const [allBooks,setAllBooks]=useState([]);
    const [isLoading,setIsLoading]=useState(0); //0-> no action, 1->is loading, 2->content loaded
    const [headingText,setHeadingText]=useState("");

    return(
        <>
        <main>
            <SubjectSearch
            setIsLoading={setIsLoading}
            setAllBooks={setAllBooks}
            setHeadingText={setHeadingText}/>

            <Search
            setIsLoading={setIsLoading}
            setAllBooks={setAllBooks}
            setHeadingText={setHeadingText}
            />

            <BookDetails
            isLoading={isLoading}
            allBooks={allBooks}
            headingText={headingText}/>
        </main>
        </>
    );
}

export default App;