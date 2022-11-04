import { useEffect, useState } from "react";

import {Getallpokemonlist} from './api/pokeman'

function App() {
  const [pokemonData, seTpokemonData]=useState([])
  useEffect(()=>{
    async function fetchData(){
      const data=await Getallpokemonlist();
      console.log(data)
      seTpokemonData(data?.results) 
    }
    fetchData()
  },[])
  return (
    <div className="App">
      <h1>pokemon list</h1>
      <div style={{display: 'flex', flexWrap:"wrap" ,marginTop:"40px",width:"90%" ,margin:"auto",margin:"30px"}}>
           {pokemonData.map((pok,index)=>{
            return (
              <div style={{width:"400px",height:"330px",border:"2px solid #000000"}} key={pok.name}> 
                 <div >
                     <p >{pok.name}</p>
                 </div>
                <img
                style={{height:"300px",width:"300px"}}
                src={`https://img.pokemondb.net/artwork/large/${pok.name}.jpg`}
                />
              </div>
            )
           })}
           </div>
    </div>
  );
}

export default App;
