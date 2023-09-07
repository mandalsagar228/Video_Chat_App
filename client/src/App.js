import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import LobbyScreen from "./screens/LobbyScreen";
import SocketProvider from "./context/SocketProvider";
import Room from "./screens/Room";
import AudioRecorder from "./screens/Audio";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SocketProvider>
          <Routes>
            <Route path="/" element={<LobbyScreen />} />
            <Route path="/room/:roomId" element={<Room />} />
            <Route path="/audio" element={<AudioRecorder />} />
          </Routes>
        </SocketProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
