import "./Home.css";
import Header from "./Header.tsx";
import { useEffect, useState } from "react";
import MovieDataComponent from "./MovieDataComponent.tsx";

type dataType = {
  date: string | null;
  id: number;
  image: string;
  movieLength: string;
  movieRating: string | null;
  movieTitle: string;
};
function Home() {
  const [data, setData] = useState<dataType[] | []>([]);

  useEffect(() => {
    async function fetchMovieData() {
      const response = await fetch("http://localhost:8080/api/data");

      const getBack = await response.json();
      setData(getBack);
    }
    fetchMovieData();
  }, []);

  return (
    <>
      <Header />

      <div className="movie-section">
        {data.map((e) => {
          return (
            <MovieDataComponent
              key={e.id}
              id={e.id}
              image={`http://localhost:8080${e.image}`}
              movieTitle={e.movieTitle}
              movieLength={e.movieLength}
              movieRating={e.movieRating}
              date={e.date}
            />
          );
        })}
      </div>
    </>
  );
}

export default Home;
