import { useState } from "react";
import "./App.css";
import wave from "./wave.svg";
import axios from "axios";
function App() {
  const [state, setState] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const findWord = async () => {
    try {
      if(input.length !==0){

      setError("")
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`
      );
      setState(response.data);
      }else{
        setError("Please enter 2 more letter")
      }
    } catch (error) {
      console.log(error)
    }
  };
  console.log(state);
  return (
    <div className="App">
      <div className="home">
        <h1>Word finder</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <span className="err">{error ? error:null}</span>
        <button onClick={findWord}>Search</button>
      </div>
      <img src={wave} alt="" />
      <div className="response">
        {state.length !== 0 &&
          [state[0]]?.map((x) => {
            return (
              <div className="resopnse-container">
                <div className="left">
                  <p>
                    <span className="sub">word :</span> {x?.word}
                  </p>
                  <p>
                    <span className="sub">phonetic:</span> {x?.phonetic}
                  </p>
                  <p>
                    <span className="sub">phonetics-uk : </span>
                    <audio src={x?.phonetics[0]?.audio} controls></audio>
                  </p>
                  <p>
                    {" "}
                    <span className="sub">phonetics-us : </span>
                    <audio src={x?.phonetics[1]?.audio} controls></audio>
                  </p>
                  <p>
                    <span className="sub">For more about {x?.word} :</span>{" "}
                    <a href={x?.sourceUrls} target="_blank" rel="noreferrer">
                      {x?.sourceUrls.map((y)=> <p>{y}</p>)}
                    </a>
                  </p>
                </div>
                <div className="right">
                  <h2>meanings:</h2>{" "}
                  {x?.meanings?.map((y) => {
                    return (
                      <div>
                        <h3>{y?.partOfSpeech}</h3>
                        <p>
                          {y?.definitions?.map((z) => {
                            return (
                              <div>
                                <p> - {z?.definition}</p>
                              </div>
                            );
                          })}
                        </p>
                      </div>
                    );
                  })}
                  <p>{x?.meanings?.definitions}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
