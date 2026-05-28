import "./CreationTab.css";
import icon from "./assets/3d-glasses.png";
import fileDrop from "./assets/fileupload.png";
import checkImage from "./assets/check.png";
import { useState, type ChangeEvent } from "react";

function CreationTab() {
  const [image, setImage] = useState<string>("");
  const [bool, setBool] = useState<boolean>(false);
  const [optionValue, setOptionValue] = useState<string>("");
  const [movieTitle, setMovieTitle] = useState<string>("");
  const [movieLength, setMovieLength] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [date, setDate] = useState<string>("");

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setBool(true);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setBool(true);
    }
  }

  function getOptionValue(e: ChangeEvent<HTMLSelectElement>) {
    setOptionValue(e.target.value);
  }

  return (
    <div>
      <div className="header-container">
        <div className="left-side-container">
          <img className="glasses-icon" src={icon} />
          <p className="title">Create</p>
        </div>
      </div>

      <div className="creation-container">
        <div className="left-side">
          <div
            className="file-drop-container"
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={handleDrop}
          >
            {bool && (
              <button
                onClick={() => {
                  setBool(false);
                  setImage("");
                }}
                className="x-button"
              >
                x
              </button>
            )}
            {bool ? (
              <>
                <div className="movie-cover-container">
                  <img className="movie-poster-img" src={image} />
                </div>
                <p className="title4">Click on the x to change cover</p>
              </>
            ) : (
              <>
                <div>
                  <img className="file-drop-img" src={fileDrop} />
                </div>

                <p className="title2">Drag Movie Cover</p>
                <p className="title3">----OR----</p>
                <label className="upload-file">
                  Browse Files
                  <input type="file" hidden onChange={handleFileChange} />
                </label>
              </>
            )}
          </div>
        </div>
        <div className="right-side">
          <p className="title5">Details</p>
          <input
            onChange={(e) => {
              setMovieTitle(e.target.value);
            }}
            className="general-input"
            placeholder="Movie Title"
          />
          <input
            onChange={(e) => {
              setMovieLength(e.target.value);
            }}
            className="general-input"
            placeholder="Movie Length"
          />
          <select className="select-element" onChange={getOptionValue}>
            <option value="">Watched Previously?</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {optionValue.toLowerCase() === "yes" && (
            <>
              <div className="rating-container">
                <input
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                  className="general-input"
                  placeholder="Rating"
                />
                <p className="title7">/10</p>
              </div>
              <div className="date-container">
                <p className="title6">Date Watched: </p>
                <input
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  className="general-input2"
                  type="date"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="check-button-container">
        <button className="check-button">
          <img className="check-img" src={checkImage} />
        </button>
      </div>
    </div>
  );
}

export default CreationTab;
