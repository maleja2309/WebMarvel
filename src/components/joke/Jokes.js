import Joke from "./Jokes";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const { useEffect, useState } = require("react");

function Jokes() {
 const [jokes, setJokes] = useState([]);

useEffect(()=>{
  if(!navigator.onLine){
      if(localStorage.getItem("jokes") === null) {
          setJokes("Loading...")
      } else {
          setJokes(localStorage.getItem("jokes"));
      }
  } else {
      const URL = "https://api.chucknorris.io/jokes/random";
      fetch(URL)
      .then((data) => data.json())
     .then((data) => {
         setJokes(data);
    
      localStorage.setItem("jokes", data.value);
      })
  }
}, []);

 return (
   <div className="container">
    <h1>Joke</h1>
     <Row>
       {
        jokes.value
       }
     </Row>
   </div>
 );
}

export default Jokes;