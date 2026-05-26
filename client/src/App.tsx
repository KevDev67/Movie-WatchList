import Header from "./Header.tsx";
import CreationTab from "./CreationTab.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/create" element={<CreationTab />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
