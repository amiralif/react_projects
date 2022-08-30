import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { createMovie } from "../../store";

import MovieForm from "./MovieForm";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "../Loading";

const CreateMovieComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSuccess = () => {
    setLoading(false);
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
  const onSubmit = (name, description, movieGenre, releaseDate) => {
    setLoading(true);
    dispatch(
      createMovie(name, description, movieGenre, releaseDate, onSuccess)
    );
  };

  return loading ? (
    <Loading />
  ) : (
    <MovieForm name={""} description={""} onFormSubmit={onSubmit} />
  );
};

export default CreateMovieComponent;
