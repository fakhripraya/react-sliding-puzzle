import React, { useRef, useState, useEffect } from "react";
import Tile from "./Tile";
import { TILE_COUNT, GRID_SIZE, BOARD_SIZE } from "./constants"
import { canSwap, shuffle, swap, isSolved } from "./helpers"
import { clearTimer, getDeadlineTime } from "./functions";
import config from './config.json'

function Board({ imgUrl, setStage, stage, withTime, fromGoBack }) {

  const intervalRef = useRef(null)
  const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
  const [isStarted, setIsStarted] = useState(false);
  const [timer, setTimer] = useState('00:00');

  useEffect(() => {
    if (stage < config["menu-stage"]) return
    console.log("fromgoback: " + fromGoBack)
    console.log("withtime: " + withTime)
    if (fromGoBack === true) {

      var minute = timer.substring(0, 2)
      var seconds = timer.substring(3, 5)
      var totalSeconds = (parseInt(minute) * 60) + parseInt(seconds)

      if (withTime) clearTimer(getDeadlineTime(totalSeconds), setTimer, intervalRef, timer)
      else clearTimer(getDeadlineTime(1), setTimer, intervalRef, timer);
      return;
    }

    if (withTime) clearTimer(getDeadlineTime(), setTimer, intervalRef, timer)
    else clearTimer(getDeadlineTime(1), setTimer, intervalRef, timer);

    if (stage > config["menu-stage"] - 1) handleShuffleClick();

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage])

  const shuffleTiles = () => {
    const shuffledTiles = shuffle(tiles)
    setTiles(shuffledTiles);
  }

  const swapTiles = (tileIndex) => {
    if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
      const swappedTiles = swap(tiles, tileIndex, tiles.indexOf(tiles.length - 1))
      setTiles(swappedTiles)
    }
  }

  const handleTileClick = (index) => {
    swapTiles(index)
  }

  const handleShuffleClick = () => {
    shuffleTiles()
  }

  const handleStartClick = () => {
    handleShuffleClick();
    setIsStarted(true)
  }

  const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
  const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
  const style = {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
  };
  const hasWon = isSolved(tiles)

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'center', marginTop: '50px' }}>
      <ul style={style} className="board">
        {tiles.map((tile, index) => (
          <Tile
            key={tile}
            index={index}
            imgUrl={imgUrl}
            tile={tile}
            width={pieceWidth}
            height={pieceHeight}
            handleTileClick={handleTileClick}
          />
        ))}
      </ul>
      {hasWon && isStarted && <div>Puzzle solved 🧠 🎉</div>}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button style={{ cursor: 'default', width: 200, height: 40, background: '#CD0000', border: 'none', marginBottom: '10px' }} ><span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Time Left</span></button>
        <button style={{ cursor: 'default', width: 200, height: 40, background: '#ffff', border: 'none' }}>
          <span style={{ color: "black", fontSize: 20, fontWeight: "bold", textAlign: 'center', margin: 0 }}>Time : {timer}</span>
        </button>
        <div style={{ width: 200, height: 'auto', marginTop: 'auto', marginBottom: '0', border: 'none', boxSizing: 'border-box' }}  ><img className="box-image" src={imgUrl} alt="1" /></div>
        <button style={{ width: 200, height: 40, background: '#CD0000', marginTop: 'auto', marginBottom: '10px', border: 'none' }} onClick={() => setStage(2, false)}><span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Play Online</span></button>
        <button style={{ width: 200, height: 40, background: '#CD0000', marginBottom: '10px', border: 'none' }} onClick={() => setStage(0, false)}><span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Restart Game</span></button>
        <button style={{ width: 200, height: 40, background: '#CD0000', border: 'none' }} onClick={() => { setStage(1, false); }}><span style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Choose Image</span></button>
      </div>
    </div>
  );
}

export default Board;
