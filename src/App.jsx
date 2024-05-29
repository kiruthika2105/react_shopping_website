import {useEffect, useState} from "react";
import "./App.css"

function Api(){

    const [displayData , setDisplayData]=useState([]);
    const [search ,setSearch]=useState("");



    useEffect(()=>{
        fetch("https://fakestoreapi.com/products").then(response=>response.json())
            .then(data=>{
                console.log(data); ///console la api la yennena data irrukkunu paakrathukku
                setDisplayData(data);
            })
    },[]);  // api ah fetch panrathukku



   //product ah sort panrathukku
    const sortElement=()=>{
        const res =displayData.sort((a,b)=>b.price-a.price);
        setDisplayData([...res]);
    }


    //for filtering the elements in an api
    const filterElements=()=>{
        const res=displayData.filter((e)=>e.price>4).slice(0,1)
        setDisplayData(res);
    }


    //for searching the products

    const handleSearchChange=(event)=>{
        setSearch(event.target.value);
    };

    const filteredData = displayData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );



    return(
        <div>
            <button onClick={sortElement}>sort</button>
            <button onClick={filterElements}>Top products</button>
            <input value={search} type={"text"} placeholder={"Type here to Search...."} onChange={handleSearchChange}/>
            <div className={"page"} >{
                 filteredData.map(display=>(
                     <div key={display.id} className={"container"} >
                         <img src={display.image} alt={display.title} className={"images"} width={"100px"} height={"100px"}/>
                         <h3>{display.title}</h3>
                         <p>{display.price} $</p>
                     </div>
                 ))}
            </div>
        </div>
    );
};

export default Api;
