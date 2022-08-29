import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { movieList } from "../../store";

const MovieListComponent = () => {
  const dispatch = useDispatch();
  let movies = useSelector((state) => state.movies);
  movies = Object.values(movies);

  let email = useSelector((state) => state.login.data.email);

  useEffect(() => {
    dispatch(movieList());
  }, [dispatch]);

  const buttonHandler = (movie) => {
    if (movie.creator === email) {
      return (
        <div className="float-end">
          <Link
            className="btn btn-info"
            to={`/movie/Update/${movie.id}`}
            style={{ marginRight: "2px" }}
          >
            Update
          </Link>
          <Link
            className="btn btn-danger"
            to={`/movie/delete/${movie.id}`}
            style={{ marginRight: "2px" }}
          >
            Delete
          </Link>
          <Link
            className="btn btn-primary"
            to={`/movie/${movie.id}`}
            style={{ marginRight: "2px" }}
          >
            View
          </Link>
        </div>
      );
    } else {
      <div className="float-end">
        <Link
          className="btn btn-primary"
          to={`/movie/${movie.id}`}
          style={{ marginRight: "2px" }}
        >
          View
        </Link>
      </div>;
    }
  };
  const moviesToShow = movies.map((movie) => (
    <div
      key={movie.id}
      className="mt-3 p-3"
      style={{ backgroundColor: "#F2F2F2" }}
    >
      {movie.name}
      {buttonHandler(movie)}
    </div>
  ));
  return <div>{moviesToShow}</div>;
};

export default MovieListComponent;
