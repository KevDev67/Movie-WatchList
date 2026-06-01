import { useNavigate } from "react-router-dom";
import "./MovieDataComponent.css";

type MovieDataProps = {
  image: string;
  movieTitle: string;
  movieLength: string;
  movieRating: string | null;
  date: string | null;
  id: number;
};

function MovieDataComponent({
  image,
  movieTitle,
  movieLength,
  movieRating,
  date,
  id,
}: MovieDataProps) {
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
