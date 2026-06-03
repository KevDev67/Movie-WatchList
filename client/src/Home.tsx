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

type searchType = {
  success: boolean;
  message: string;
  data: dataType[];
};
function Home() {
  const [data, setData] = useState<dataType[] | []>([]);
  const [search, setSearch] = useState<searchType>();

  useEffect(() => {
    async function fetchMovieData() {
      const response = await fetch("http://localhost:8080/api/data");
      const getBack = await response.json();
      setData(getBack);
    }
    fetchMovieData();
  }, [data]);

  return (
    <>
      <Header setSearch={setSearch} />

      <div className="movie-section">
        {(search?.data ?? data).map((e) => {
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
