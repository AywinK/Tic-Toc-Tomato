import './App.css';

function App() {
  return (
    <div className="App">
      <div className="TicTocTomato">
        <audio id="beep"></audio>
        <h1 className="title">Tic Toc Tomato</h1>
        <h2 id="timer-label">Focus/Break</h2>
        <span id="time-left">25:00</span>
        <i id="start_stop">start/pause</i>
        <div className="secondary-controls">
          <div id="session-controls">
            <h3 id="session-label">Session Duration</h3>
            <i id="session-decrement">-</i>
            <span id="session-length">25</span>
            <i id="session-increment">+</i>
          </div>
          <i id="reset">reset</i>
          <div id="break-controls">
          <h3 id="break-label">Break Duration</h3>
            <i id="break-decrement">-</i>
            <span id="break-length">5</span>
            <i id="break-increment">+</i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
