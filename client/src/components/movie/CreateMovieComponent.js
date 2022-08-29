import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createMovie } from "../../store";

import MovieForm from "./MovieForm";
import { toast } from "react-toastify";

const CreateMovieComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSuccess = () => {
    toast.success("Your Movie Added!", {
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
  const onSubmit = (name, description) => {
    dispatch(createMovie(name, description, onSuccess));
  };

  return <MovieForm name={""} description={""} onFormSubmit={onSubmit} />;
};

export default CreateMovieComponent;
