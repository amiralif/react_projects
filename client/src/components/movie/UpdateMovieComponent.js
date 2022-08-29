import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieList, updateMovie } from "../../store";
import MovieFrom from "./MovieForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateMovieComponent = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const navigate = useNavigate();

  const editMovie = useSelector((state) => state.movies[movieId]);

  useEffect(() => {
    dispatch(movieList(movieId));
  }, [dispatch, movieId]);

  const onSuccess = () => {
    toast.success("Your Movie Updated!", {
      autoClose: true,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: true,
      progress: undefined,
    });
    navigate("/movies");
  };
  
  const formSubmit = (name, descriptions) => {
    dispatch(updateMovie(movieId, name, descriptions, onSuccess));
  };

  return (
    <MovieFrom
      name={editMovie && editMovie.name}
      description={editMovie && editMovie.description}
      onFormSubmit={formSubmit}
    />
  );
};

export default UpdateMovieComponent;
