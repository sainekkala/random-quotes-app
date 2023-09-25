import React, { useEffect, useState } from "react";
import axios from "axios";


function Quotes () {
    const [data, setData] = useState([]);
    const [randomdata, setRandomData] = useState({
        quote : "Eighty percent of success is showing up.",
        author : "Woody Allen",
    });
    useEffect ( () => {
        axios.get("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
        .then(res => setData(res.data.quotes))
        .catch((error) => console.log(error))
    },[]);

   const randomColor = () => {
        let colorpattern = "1234567890ABCDEF";
        let color = "#"
        for (let i = 0; i < 6; i++){
            color = color+colorpattern[Math.floor(Math.random() * 16)];
        }
        return color;
    };


    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const {quote, author} = data[randomIndex];
        const color = randomColor();
        document.body.style.color = color;
        document.body.style.backgroundColor = color;
        setRandomData({
            quote : quote,
            author : author,
        });
    };

    const color = randomdata.color || randomColor(); 

    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-sm quote-box m-5">
                {randomdata ? (
                    <>
                        <p style={{color:color}}>{randomdata.quote}</p>
                        <h1 style={{color:color}}>{randomdata.author}</h1>
                    </>
                    ) : (
                    <p>Loading...</p>
                )}
                    <div className="buttons">
                    <button onClick={getRandomQuote} style={{backgroundColor:color}}>New Quote</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default Quotes;