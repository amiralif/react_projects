import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuthenticateStatus } from "../store";

import Authenticate from "./auth/Authenticate";
import MovieListComponent from "./movie/MovieListComponent";
import MovieComponent from "./movie/MovieComponent";
import CreateMovieComponent from "./movie/CreateMovieComponent";
import UpdateMovieComponent from "./movie/UpdateMovieComponent";
import DeleteMovieComponent from "./movie/DeleteMovieComponent";
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
            <Route path="/movies" element={<MovieListComponent />}></Route>
            <Route path="/movies/:movieId" element={<MovieComponent />}></Route>
            <Route path="/movies/create" element={<CreateMovieComponent />}></Route>
            <Route
              path="/movies/update/:movieId"
              element={<UpdateMovieComponent />}
            ></Route>
            <Route
              path="/movies/delete/:movieId"
              element={<DeleteMovieComponent />}
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
