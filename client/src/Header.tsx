import { useNavigate } from "react-router-dom";
import "./Header.css";
import icon from "./assets/3d-glasses.png";
import { useEffect, useState } from "react";

function Header({ setSearch }) {
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const travel = () => {
    navigate("/create");
  };

  useEffect(() => {
    async function sendMovieTitle() {
      if (!title.trim()) return;

      const request = await fetch(
        `http://localhost:8080/api/data/title?movieTitle=${title}`,
      );

      const response = await request.json();
      setSearch(response);
    }

    sendMovieTitle();
  }, [setSearch, title]);

  return (
    <div>
      <div className="header-container">
        <div className="left-side-container">
          <img className="glasses-icon" src={icon} />
          <p className="title">Home</p>
        </div>
        <div className="middle-container">
          <p className="title">Movie WishList</p>
        </div>
        <div className="right-side-container">
          <input
            className="search-input"
            placeholder="Search"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <button className="add-button" onClick={travel}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
