import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuthenticateStatus } from "../store";

import Authenticate from "./auth/Authenticate";
import MovieList from "./movie/MovieList";
import Movie from "./movie/Movie";
import CreateMovie from "./movie/CreateMovie";
import UpdateMovie from "./movie/UpdateMovie";
import DeleteMovie from "./movie/DeleteMovie";
import NotFound from "./NotFound";

function App() {
  const { data: loginData } = useSelector((store) => store.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthenticateStatus());
  }, [dispatch]);

  const contentToShow = () => {
    if (loginData) {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Authenticate />}></Route>
            <Route path="/movies" element={<MovieList />}></Route>
            <Route path="/movies/:movieId" element={<Movie />}></Route>
            <Route path="/movies/create" element={<CreateMovie />}></Route>
            <Route
              path="/movies/update/:movieId"
              element={<UpdateMovie />}
            ></Route>
            <Route
              path="/movies/delete/:movieId"
              element={<DeleteMovie />}
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Authenticate />}></Route>

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      );
    }
  };

  return (
    <div className="container mt-3">
      {contentToShow()}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
