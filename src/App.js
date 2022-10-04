import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [gameMode, setGameMode] = useState(null);
  const [data, setData] = useState(null);
  const [gameFields, setGameFields] = useState(null);
  const [startGame, setStartGame] = useState(false);
  useEffect(() => {
    axios
      .get("https://demo7919674.mockable.io/")
      .then((response) => setData(response.data));
  }, []);

  const getDifficultOfGame = (e) => {
    setGameMode(e.target.value);
  };

  useEffect(() => {
    const fields = data?.filter((i) => i.name === gameMode).map((i) => i.field);
    const NumOfFields = Number(fields?.join());
    let arr = [];
    for (let i = 0; i < NumOfFields; i++) {
      arr.push({
        isBlue: false,
      });
    }
    setGameFields(arr);
  }, [startGame]);

  const handleBlurer = (id) => {
    setGameFields(
      gameFields.map((i, index) => {
        if (index === id) {
          if (i.isBlue) {
            i.isBlue = false;
          } else i.isBlue = true;
        }
        return i;
      })
    );
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="game-div">
          <div className="buttons">
            <select
              className="dropdown"
              onChange={(e) => getDifficultOfGame(e)}
            >
              <option value="" disabled selected>
                Pick mode
              </option>
              {data &&
                data.map((i, index) => {
                  return (
                    <option key={index} value={i.name}>
                      {i.name}
                    </option>
                  );
                })}
            </select>
            <button className="button" onClick={() => setStartGame(true)}>
              START
            </button>
          </div>
          <div className="game">
            {startGame &&
              gameFields &&
              gameFields.map((i, index) => {
                return (
                  <div
                    key={index}
                    className={i.isBlue ? "field blue" : "field"}
                    onMouseEnter={() => handleBlurer(index)}
                  ></div>
                );
              })}
          </div>
        </div>
        <div className="hovered-squares">
          <div className="title-h2">Hover squares</div>
          {gameFields &&
            gameFields.map((i, index) => {
              if (i.isBlue) {
                return (
                  <div className="info-hovered_col">
                    row {Math.ceil((index + 1) / 5)} col {index + 1}
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
