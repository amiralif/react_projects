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

  const onError = (e) => {
    setLoading(false);
    if (e.message === "Network Error") {
      toast.error(e.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(e.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };


  const onSubmit = (name, description, movieGenre, releaseDate) => {
    setLoading(true);
    dispatch(
      createMovie(name, description, movieGenre, releaseDate, onSuccess ,onError)
    );
  };

  return loading ? (
    <Loading />
  ) : (
    <MovieForm name={""} description={""} onFormSubmit={onSubmit} />
  );
};

export default CreateMovieComponent;
