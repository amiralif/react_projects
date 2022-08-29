import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieDetails } from "../../store";
import classes from "../../css/MovieList.module.css";

const MovieComponent = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const movie = useSelector((state) => state.movies[movieId]);

  useEffect(() => {
    dispatch(movieDetails(movieId));
  }, [dispatch, movieId]);

  const movieContainer = () => {
    if (movie) {
      return (
        <div
          key={movie.id}
          className={`d-flex flex-row ${classes.movies_row} m-t-0`}
        >
          <div className={`${classes.p_2}`}></div>
          <div className={`${classes.movies_text} ${classes.w_100} `}>
            <h6 className="font-medium"> {movie.name} </h6>
            <span className={`${classes.m_b_15} d-block`}>
              Creator: {movie.creator.split("@")[0]}
            </span>
            <span className={`${classes.m_b_15} `}>{movie.description}</span>
            <span className={`${classes.m_b_15} float-end `}>
              {movie.createDate}
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`row d-flex justify-content-center container mt-3`}>
      <div className="col-lg-6">
        <div className={`card ${classes.card}`}>
          <div className={`${classes.movie_widgets}`}>{movieContainer()}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieComponent;
