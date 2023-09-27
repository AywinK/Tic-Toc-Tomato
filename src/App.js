import { useRef, useEffect, useState, useReducer } from 'react';

import './App.css';

import beep from "./assets/audio/a320-tritone-chime-104562.mp3"

import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

const reducer = (state, action) => {
  switch (action.type) {
    case "RESET":
      return init();

    case "BREAK-INC":
      if (state.breakLength < 60 && state.breakLength >= 1) {
        return { ...state, breakLength: state.breakLength + 1 }
      }
      return state;

    case "SESSION-INC":
      if (state.sessionLength < 60 && state.sessionLength >= 1) {
        return { ...state, sessionLength: state.sessionLength + 1 }
      }
      return state;

    case "BREAK-DEC":
      if (state.breakLength <= 60 && state.breakLength > 1) {
        return { ...state, breakLength: state.breakLength - 1 }
      }
      return state;

    case "SESSION-DEC":
      if (state.sessionLength <= 60 && state.sessionLength > 1) {
        return { ...state, sessionLength: state.sessionLength - 1 }
      }
      return state;

    case "UPDATE_TIME_LEFT":
      return updateTimeLeft(state);

    case "UPDATE_IS_PLAYING":
      return { ...state, isPlaying: !state.isPlaying };

    case "COUNT_DOWN":
      if (!!state.isPlaying) {
        return { ...state, timeLeft: state.timeLeft - 1 };
      } else {
        return state;
      }

    case "CHANGE_SESSION":
      if (state.sessionType === "Focus") {
        return { ...state, sessionType: "Break", timeLeft: state.breakLength * 60 }
      } else if (state.sessionType === "Break") {
        return { ...state, sessionType: "Break", timeLeft: state.breakLength * 60 }
      } else {
        console.error("CHANGE_SESION case else triggered, returned original state");
        return state;
      }

    default:
      console.log("unknown case - returning state");
      return state;
  }
}

function init() {

  const initialState = {
    isRunning: false,
    breakLength: 5,
    sessionLength: 25,
    sessionType: "Focus",
    timeLeft: 1500
  }

  return initialState;
}

const updateTimeLeft = (state) => {
  if (state.sessionType === "Focus") {
    return { ...state, timeLeft: state.sessionLength * 60 }
  } else {
    return { ...state, timeLeft: state.breakLength * 60 }
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, null, init);

  const handleUpdateIsPlaying = () => {
    dispatch({ type: "UPDATE_IS_PLAYING" })
  };

  const handleUpdateTimeLeft = () => {
    dispatch({ type: "UPDATE_TIME_LEFT" })
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  const handleBreakIncrease = () => {
    dispatch({ type: "BREAK-INC" })
  };

  const handleBreakDecrease = () => {
    dispatch({ type: "BREAK-DEC" })
  };

  const handleSessionIncrease = () => {
    dispatch({ type: "SESSION-INC" })
  };

  const handleSessionDecrease = () => {
    dispatch({ type: "SESSION-DEC" })
  };

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    setIsPlaying(true);
  };

  const audioRef = useRef(null);
  // console.log(audioRef);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  useEffect(() => {
    setInterval(() => {
      if (!!state.isPlaying) {
        dispatch({ type: "COUNT_DOWN" });
      } else if (state.isPlaying === false) {
        console.log("paused", state.isPlaying)
      }
    }, 1000);
  }, [state.isPlaying]);

  useEffect(() => {
    if (state.timeLeft === 0) {
      dispatch({ type: "CHANGE_SESSION" });
    }
  })

  useEffect(() => {

    handleUpdateTimeLeft();

  }, [state.sessionLength, state.breakLength, state.sessionType]);

  return (
    <div className="App">
      <audio ref={audioRef} id="beep" src={beep} preload="auto" type="audio/mp3"></audio>
      <h1 className="title">Tic Toc Tomato</h1>
      <h2 id="timer-label">{state.sessionType}</h2>
      <span id="time-left">{`${Math.floor(state.timeLeft / 60)}:`}{state.timeLeft % 60 < 10 ? `0${state.timeLeft % 60}` : state.timeLeft % 60}</span>
      <button className="btn" onClick={() => {
        handlePlayAudio();
        handleUpdateIsPlaying();
      }} id="start_stop">{!state.isPlaying ? <PlayArrowRoundedIcon fontSize="large" /> : <PauseRoundedIcon fontSize="large" />}</button>
      <div id="secondary-controls">
        <div id="session-controls">
          <h3 id="session-label">Session Duration</h3>
          <button className="btn" id="session-decrement" onClick={handleSessionDecrease}><RemoveRoundedIcon fontSize="large" /></button>
          <span id="session-length">{state.sessionLength}</span>
          <button className="btn" id="session-increment" onClick={handleSessionIncrease}><AddRoundedIcon fontSize="large" /></button>
        </div>
        <button className="btn" id="reset" onClick={handleReset}><RestartAltRoundedIcon fontSize="large" /></button>
        <div id="break-controls">
          <h3 id="break-label">Break Duration</h3>
          <button className="btn" id="break-decrement" onClick={handleBreakDecrease}><RemoveRoundedIcon fontSize="large" /></button>
          <span id="break-length">{state.breakLength}</span>
          <button className="btn" id="break-increment" onClick={handleBreakIncrease}><AddRoundedIcon fontSize="large" /></button>
        </div>
      </div>
    </div>
  );
}

export default App;
