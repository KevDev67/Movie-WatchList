import "./Header.css";
import icon from "./assets/3d-glasses.png";

function Header() {
  return (
    <>
      <div className="header-container">
        <div className="left-side-container">
          <img className="glasses-icon" src={icon} />
          <p className="title">Home</p>
        </div>
        <div className="middle-container">
          <p className="title">Movie WishList</p>
        </div>
        <div className="right-side-container">
          <input className="search-input" placeholder="Search" />
          <button className="add-button">Add</button>
        </div>
      </div>
    </>
  );
}

export default Header;
