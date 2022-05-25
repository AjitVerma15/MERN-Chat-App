import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./views/HomePage";
import { ChatPage } from "./views/ChatPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
