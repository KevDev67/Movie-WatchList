import CreationTab from "./CreationTab.tsx";
import Home from "./Home.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreationTab />} />
        <Route path="/create/:id" element={<CreationTab />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
