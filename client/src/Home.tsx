import "./Home.css";
import Header from "./Header.tsx";
function Home() {
  return (
    <>
      <Header />

      <div className="movie-section">
        <div className="test">movie one</div>
        <div className="test">movie two</div>
        <div className="test">movie three</div>
        <div className="test">movie four</div>
        <div className="test">movie five</div>
        <div className="test">movie six</div>
      </div>
    </>
  );
}

export default Home;
