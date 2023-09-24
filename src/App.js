import './App.css';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

function App() {
  return (
    <div className="App">
      <audio id="beep"></audio>
      <h1 className="title">Tic Toc Tomato</h1>
      <h2 id="timer-label">Focus/Break</h2>
      <span id="time-left">25:00</span>
      <button className="btn" id="start_stop"><PlayArrowRoundedIcon fontSize="large" /><PauseRoundedIcon fontSize="large" /></button>
      <div id="secondary-controls">
        <div id="session-controls">
          <h3 id="session-label">Session Duration</h3>
          <button className="btn" id="session-decrement"><RemoveRoundedIcon fontSize="large" /></button>
          <span id="session-length">25</span>
          <button className="btn" id="session-increment"><AddRoundedIcon fontSize="large" /></button>
        </div>
        <button className="btn" id="reset"><RestartAltRoundedIcon fontSize="large" /></button>
        <div id="break-controls">
          <h3 id="break-label">Break Duration</h3>
          <button className="btn" id="break-decrement"><RemoveRoundedIcon fontSize="large" /></button>
          <span id="break-length">5</span>
          <button className="btn" id="break-increment"><AddRoundedIcon fontSize="large" /></button>
        </div>
      </div>
    </div>
  );
}

export default App;
