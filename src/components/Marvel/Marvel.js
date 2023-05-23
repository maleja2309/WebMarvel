import Joke from "./Marvel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import md5 from "md5";

const { useEffect, useState } = require("react");

function Marvel() {
    const [marvel, setMarvel] = useState([]);
    const publicKey = '9533fbe3808cffb0e01d59ef80d8c061';
    const privateKey = '1913bfe348964439bb1cfa98fccd83ad18eadb9c';
    const timestamp = new Date().getTime().toString();
    const hash = md5(timestamp + privateKey + publicKey);
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    useEffect(() => {
        if (!navigator.onLine) {
            if (localStorage.getItem("marvel") === null) {
                setMarvel("Loading...")
            } else {
                setMarvel(localStorage.getItem("marvel"));
            }
        } else {
            fetch(url)
                .then((data) => data.json())
                .then((data) => {
                    setMarvel(data);

                    localStorage.setItem("marvel", data.value);
                })
        }
    }, []);
    const characters = marvel.data ? marvel.data.results : [];
    return (
        <div>
            <h1>Marvel superheroes</h1>
          {characters.map(character => (
            <div key={character.id}>
              <h3>{character.name}</h3>
              <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
            </div>
          ))}
        </div>
      );
}

export default Marvel;
