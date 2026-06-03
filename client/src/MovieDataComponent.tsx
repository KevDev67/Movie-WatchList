import { useNavigate } from "react-router-dom";
import "./MovieDataComponent.css";
import closedTrash from "./assets/trash.png";
import openedTrash from "./assets/open-bin.png";
import { useState } from "react";

type MovieDataProps = {
  image: string;
  movieTitle: string;
  movieLength: string;
  movieRating: string | null;
  date: string | null;
  id: number;
};

async function deleteData(id: number) {
  await fetch(`http://localhost:8080/api/data/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function MovieDataComponent({
  image,
  movieTitle,
  movieLength,
  movieRating,
  date,
  id,
}: MovieDataProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const navigate = useNavigate();
  let formDate = "";

  if (date) {
    formDate = new Date(date).toLocaleDateString();
  }

  return (
    <div
      className="main-container"
      onClick={() => {
        navigate(`/create/${id}`);
      }}
    >
      <div>
        <button
          onMouseEnter={() => {
            setHovered(true);
          }}
          onMouseLeave={() => {
            setHovered(false);
          }}
          className="delete-button"
          onClick={(e) => {
            deleteData(id);
            e.stopPropagation();
          }}
        >
          <img
            className="delete-image"
            src={hovered ? openedTrash : closedTrash}
          />
        </button>
      </div>

      <div className="left-side-two">
        <img className="movie-poster" src={image} />
      </div>
      <div className="right-side-two">
        <p className="movie-title">{movieTitle}</p>
        <p className="movie-length">Length: {movieLength}</p>
        {movieRating && <p className="rating-p"> Rating: {movieRating}/10</p>}
        {date && <p className="date-p"> Date Watched: {formDate}</p>}
      </div>
    </div>
  );
}

export default MovieDataComponent;
