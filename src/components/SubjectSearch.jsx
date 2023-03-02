import React, { useState } from "react";
import axios from "axios";

function SubjectSearch({setIsLoading,setAllBooks,setHeadingText}){
    const [trendingSubjects,setTrendingSubject]=useState(["Javascript","Harry Potter","Indian History","Crypto Currency","Criminal Law"]);
    const [searchVal,setSearchVal]=useState("");
    let allSubjects=["Javascript","Harry Potter","Indian History","Crypto Currency","Criminal Law"];

    async function getBooks(selectedSubj){
        let newSelectedSubj=selectedSubj.replace(" ","%20");
        const url="https://openlibrary.org/subjects/"+newSelectedSubj+".json?details=true";
        const res= await axios.get(url);
        let resp=res.data.works;

        let bookNames=[];
        let totalLength=Object.keys(resp).length;
        totalLength=Math.min(totalLength,10);
        for(var i=0;i<totalLength;i++){
            let title_name="NA";
            if('title' in resp[i]) title_name=resp[i].title;
            bookNames.push(title_name);
        }
        setIsLoading(2);
        setAllBooks(bookNames);
    }

    function handleClick(event){
        let sub=event.target.innerHTML;
        sub=sub.toLowerCase();
        let showHeading=sub[0].toUpperCase()+sub.substring(1);
        setHeadingText(showHeading);
        setIsLoading(1);
        getBooks(sub);
    }

    function handleChange(event){
        let value=event.target.value;
        if(value===""){
            setSearchVal("");
            setTrendingSubject(allSubjects);
        }
        else{
            setSearchVal(value);
            let matchedSubjects=[];
            trendingSubjects.forEach((subj)=>{
                let tempSubj=subj.toLowerCase();
                let tempValue=value.toLowerCase();
                if(tempSubj.includes(tempValue)) matchedSubjects.push(subj);
            });
            setTrendingSubject(matchedSubjects);
        }
    }

    return(
        <div className="side-nav">
            <h3 className="trending-subjects">Trending Subjects</h3>
            <input type="text" 
            placeholder="search Subjects"
            value={searchVal}
            onChange={handleChange}
            className="subj-search"/>

            <ul className="list">
                {trendingSubjects.map((subj,idx)=>{
                    return <li key={idx} className="list-items" onClick={handleClick}>{subj}</li>
                })}
            </ul>
            
        </div>
    );
}

export default SubjectSearch;