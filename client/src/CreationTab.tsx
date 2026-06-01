import "./CreationTab.css";
import icon from "./assets/3d-glasses.png";
import fileDrop from "./assets/fileupload.png";
import checkImage from "./assets/check.png";
import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

type dataType = {
  data: object;
  message: string;
  success: boolean;
};

type previousDataType = {
  data: {
    id: number;
    image: string;
    movieLength: string;
    movieRating: string;
    movieTitle: string;
    watched_previously: string;
    date: string | null;
  };
  message: string;
  success: boolean;
};

function CreationTab() {
  const [image, setImage] = useState<string>("");
  const [bool, setBool] = useState<boolean>(false);
  const [optionValue, setOptionValue] = useState<string>("");
  const [movieTitle, setMovieTitle] = useState<string>("");
  const [movieLength, setMovieLength] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<dataType>();
  const [previousData, setPreviousData] = useState<previousDataType | null>(
    null,
  );

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (data && data.success === false) {
      alert(data.message);
    } else if (data && data.success) {
      navigate("/");
    }
  }, [data, navigate]);

  useEffect(() => {
    async function getMovieRequest() {
      if (id) {
        const response = await fetch(`http://localhost:8080/api/data/${id}`);

        const dataReturn = await response.json();
        setPreviousData(dataReturn);
        setMovieTitle(dataReturn.data.movieTitle);
        setMovieLength(dataReturn.data.movieLength);
        setImage(`http://localhost:8080${dataReturn.data.image}`);

        if (dataReturn.data.watched_previously === "yes") {
          setOptionValue(dataReturn.data.watched_previously);
          setRating(dataReturn.data.movieRating);
          setDate(dataReturn.data.date);
        }
        setBool(true);
      }
    }
    getMovieRequest();
  }, [id]);

  useEffect(() => {
    console.log(previousData);
  }, [previousData]);

  async function sendPost() {
    const form = new FormData();

    if (file) {
      form.append("image", file);
    }

    form.append("movieTitle", movieTitle);
    form.append("movieLength", movieLength);
    form.append("watched_previously", optionValue);

    if (optionValue === "yes") {
      form.append("rating", rating);
      form.append("date", date);
    }

    let data1;

    if (id) {
      const response = await fetch(`http://localhost:8080/api/data/${id}`, {
        method: "PATCH",
        body: form,
      });

      data1 = await response.json();
    } else {
      const response = await fetch("http://localhost:8080/api/data", {
        method: "POST",
        body: form,
      });

      data1 = await response.json();
    }

    setData(data1);
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setBool(true);
      setFile(file);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setBool(true);
      setFile(file);
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
            value={movieTitle}
          />
          <input
            onChange={(e) => {
              setMovieLength(e.target.value);
            }}
            className="general-input"
            placeholder="Movie Length"
            value={movieLength}
          />
          <select
            className="select-element"
            value={optionValue}
            onChange={getOptionValue}
          >
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
                  value={rating}
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
                  value={date}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="check-button-container">
        <button onClick={sendPost} className="check-button">
          <img className="check-img" src={checkImage} />
        </button>
      </div>
    </div>
  );
}

export default CreationTab;
