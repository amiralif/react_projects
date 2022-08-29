import { useState } from "react";
import classes from "../../css/MovieList.module.css";

const MovieForm = (props) => {
  const [movieName, setMovieName] = useState(props.name);
  const [movieDescription, setDescription] = useState(props.description);

  const isEdite = movieName ? true : false;

  const formSubmit = (e) => {
    e.preventDefault();
    props.onFormSubmit(movieName, movieDescription);
  };

  return (
    <div className={`row d-flex justify-content-center container mt-3`}>
      <div className="col-lg-6">
        <div className={`card ${classes.card}`}>
          <div className={`${classes.movie_widgets}`}>
            <div className={`d-flex flex-row ${classes.movies_row} m-t-0`}>
              <div className={`${classes.p_2}`}></div>
              <div className={`${classes.movies_text} ${classes.w_100} `}>
                <form onSubmit={formSubmit}>
                  <div className="form-control mb-3">
                    <label className="form-label" htmlFor="name">
                      Movie/Serial Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control form-control-lg"
                      placeholder="Enter Movie/Serial Name"
                      value={movieName}
                      onChange={(e) => setMovieName(e.target.value)}
                    />
                  </div>

                  <div className="form-control mb-3">
                    <label className="form-label" htmlFor="description">
                      Description Name:
                    </label>
                    <textarea
                      id="description"
                      className="form-control form-control-lg"
                      rows="10"
                      placeholder="Enter Movie/Serial Description"
                      value={movieDescription}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="form-control mb-3">
                    <button type="submit" className="btn btn-success btn-lg">
                      {isEdite ?" Update" : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
