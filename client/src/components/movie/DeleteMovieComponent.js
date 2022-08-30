import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteMovie, movieList } from "../../store";

const DeleteMovieComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(true);

  const { movieId } = useParams();
  const deletedMovie = useSelector((state) => state.movies[movieId]);

  useEffect(() => {
    dispatch(movieList(movieId));
  }, [movieId, dispatch]);

  const deleteBtn = () => {
    dispatch(
      deleteMovie(movieId, () => {
        navigate("/movies");
      })
    );
  };

 

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate("/movies");
  };

  const customStyle = {
    overlay: { zIndex: 1000 },
    content: {
      width: "30%",
      height: "40%",
      position: "absolute",
      top: "25%",
      left: "35%",
      right: "auto",
      bottom: "auto",
    },
  };
  const popupView = () => {
    return (
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card py-4 px-4">
          <div className="text-center">
            <span
              className="material-symbols-outlined"
              style={{ color: "darkred" }}
            >
              error
            </span>
          </div>
          <div className="text-center mt-3">
            <span className="info-text">
              Are you Sure to delete {deletedMovie && deletedMovie.name}
            </span>
          </div>
          <div className="position-relative mt-3 form-input">
            <div className="d-flex justify-content-between">
              <button className="btn btn-danger" onClick={deleteBtn}>
                Yes
              </button>
              <button className="btn btn-primary" onClick={handleCloseModal}>
                No (Cancel){" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ReactModal
      closeTimeoutMS={500}
      isOpen={isModalOpen}
      style={customStyle}
      contentLabel="Delete Movie"
      id="deletePopup"
    >
      {popupView()}
    </ReactModal>
  );
};

export default DeleteMovieComponent;
