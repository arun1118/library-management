import React,{useState} from "react";
import axios from "axios";

function Search({setAllBooks,setIsLoading,setHeadingText}){
    const [searchVal,setSearchVal]=useState("");

    async function getBooks(){
        if(searchVal.length){
            let newSearchVal=searchVal.replace(" ","%20");
            // const resTitle= await axios.get("https://openlibrary.org/search.json?title="+newSearchVal+"&limit="+limit);
            const resTitle= await axios.get("https://openlibrary.org/search.json?title="+newSearchVal);
            let titleBasedLength=resTitle.data.docs.length;
            // const resAuthor= await axios.get("https://openlibrary.org/search.json?author="+newSearchVal+"&limit="+limit);
            const resAuthor= await axios.get("https://openlibrary.org/search.json?author="+newSearchVal);
            let authorBasedLength=resAuthor.data.docs.length;

            let resp;
            if(titleBasedLength>authorBasedLength) resp=resTitle.data.docs;
            else resp=resAuthor.data.docs;
            let bookNames=[];
            let totalLength=Object.keys(resp).length;
            for(var i=0;i<totalLength;i++){
                let publish_year=[-1];
                if("publish_year" in resp[i]){
                    publish_year=resp[i].publish_year;
                    publish_year.sort();
                }
                let auther_name="NA";
                if("author_name" in resp[i]) auther_name=resp[i].author_name[0];
                let title_name=resp[i].title;
                if("subtitle" in resp[i]) title_name+=(" "+resp[i].subtitle);
                var temp={
                    "title" : title_name,
                    "author" : auther_name,
                    "first_publish" : publish_year[0],
                    "latest_publish" : publish_year[publish_year.length-1]
                }
                bookNames.push(temp);
            }
            setSearchVal("");
            setIsLoading(2);
            setAllBooks(bookNames);
        }
    }

    function handleChange(event){
        let value=event.target.value;
        setSearchVal(value);
    }

    function handleSubmit(event){
        event.preventDefault();
        let showHeading=searchVal[0].toUpperCase()+searchVal.substring(1);
        setHeadingText(showHeading);
        setIsLoading(1);
        getBooks();
    }

    function clearSearch(event){
        event.preventDefault();
        setSearchVal("");
        setHeadingText("");
        setIsLoading(0);
        setAllBooks([]);
    }

    return(
        <div className="top-nav">
            <form>
                <input type="text" 
                    value={searchVal}
                    onChange={handleChange}
                    placeholder="Search by Title or by Author"
                    className="search_title"
                />
                <button onClick={handleSubmit} className="search-btn">Search</button>
                <button onClick={clearSearch} className="clear-btn">Clear</button>
            </form>
        </div>
    );
}

export default Search;