import "./MovieDataComponent.css";

type MovieDataProps = {
  image: string;
  movieTitle: string;
  movieLength: string;
  movieRating: string | null;
  date: string | null;
};

function MovieDataComponent({
  image,
  movieTitle,
  movieLength,
  movieRating,
  date,
}: MovieDataProps) {
  let formDate = "";
  if (date) {
    formDate = new Date(date).toLocaleDateString();
  }
  return (
    <div className="main-container">
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
