import React, { useEffect, useState } from "react";
import { BsHeartFill, BsSearch, BsX } from "react-icons/bs";
import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  Header,
  Searchbar,
  Movies,
  PaginationContainer,
} from "../../styles/global";
import { Card, CardMedia, Dialog, IconButton } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserView, MobileView, isMobile } from "react-device-detect";

interface Movie {
  Title: string;
  imdbID: string;
  Poster: string;
}

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#b71a51",
      contrastText: "#fff",
    },
    secondary: {
      main: "#353740",
      contrastText: "#fff",
    },
  },
});

const Favorites: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Movie>({
    Title: "",
    imdbID: "",
    Poster: "",
  });
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeMovieData, setRemoveMovieData] = useState<Movie>();

  const movies = [
    {
      Title: "Pirates of the Caribbean: The Curse of the Black Pearl",
      imdbID: "tt0325980",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    },
    {
      Title: "Pirates of the Caribbean: Dead Man's Chest",
      imdbID: "tt0383574",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTcwODc1MTMxM15BMl5BanBnXkFtZTYwMDg1NzY3._V1_SX300.jpg",
    },
    {
      Title: "Pirates of the Caribbean: At World's End",
      imdbID: "tt0449088",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjIyNjkxNzEyMl5BMl5BanBnXkFtZTYwMjc3MDE3._V1_SX300.jpg",
    },
    {
      Title: "Pirates of the Caribbean: On Stranger Tides",
      imdbID: "tt1298650",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjE5MjkwODI3Nl5BMl5BanBnXkFtZTcwNjcwMDk4NA@@._V1_SX300.jpg",
    },
    {
      Title: "Pirates of the Caribbean: Dead Men Tell No Tales",
      imdbID: "tt1790809",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTYyMTcxNzc5M15BMl5BanBnXkFtZTgwOTg2ODE2MTI@._V1_SX300.jpg",
    },
    {
      Title: "Pirates of the Caribbean: The Curse of the Black Pearl",
      imdbID: "tt0325980",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    },
    {
      Title: "Pirates of the Caribbean: Dead Man's Chest",
      imdbID: "tt0383574",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTcwODc1MTMxM15BMl5BanBnXkFtZTYwMDg1NzY3._V1_SX300.jpg",
    },
    {
      Title: "Pirates of the Caribbean: At World's End",
      imdbID: "tt0449088",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjIyNjkxNzEyMl5BMl5BanBnXkFtZTYwMjc3MDE3._V1_SX300.jpg",
    },
    {
      Title: "Pirates of the Caribbean: On Stranger Tides",
      imdbID: "tt1298650",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjE5MjkwODI3Nl5BMl5BanBnXkFtZTcwNjcwMDk4NA@@._V1_SX300.jpg",
    },
    {
      Title: "Pirates of the Caribbean: Dead Men Tell No Tales",
      imdbID: "tt1790809",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTYyMTcxNzc5M15BMl5BanBnXkFtZTgwOTg2ODE2MTI@._V1_SX300.jpg",
    },
  ];

  function openMovieModal(movie: Movie) {
    setModalOpen(true);
    setModalData(movie);
  }

  function openRemoveDialog(movie: Movie) {
    setRemoveDialogOpen(true);
    setRemoveMovieData(movie);
  }

  return (
    <ThemeProvider theme={theme}>
      <Header>
        <h1>Favoritos</h1>
        <Link to="/">
          <FiChevronLeft color="#b71a51" size="20" />
          Voltar
        </Link>
      </Header>
      <Searchbar>
        <input placeholder="Procure por seu favorito" />
        <button type="submit">
          <BsSearch color="#fff" />
        </button>
      </Searchbar>
      <BrowserView>
        <Movies isMobile={isMobile}>
          {movies.map((movie) => (
            <div>
              <img
                onClick={() => openMovieModal(movie)}
                src={movie.Poster}
                alt={movie.imdbID}
              />
              <IconButton
                style={{
                  position: "absolute",
                  zIndex: 2,
                  bottom: -3,
                  right: -3,
                }}
              >
                <BsHeartFill color="#b71a51" />
              </IconButton>
            </div>
          ))}
        </Movies>
      </BrowserView>
      <MobileView>
        <Movies isMobile={isMobile}>
          {movies.slice(0, 5).map((movie) => (
            <div>
              <img
                onClick={() => openMovieModal(movie)}
                src={movie.Poster}
                alt={movie.imdbID}
              />
              <IconButton
                style={{
                  position: "absolute",
                  zIndex: 2,
                  bottom: -3,
                  right: -3,
                }}
              >
                <BsHeartFill color="#b71a51" />
              </IconButton>
            </div>
          ))}
        </Movies>
        <Movies isMobile={isMobile}>
          {movies.slice(5, 10).map((movie) => (
            <div>
              <img
                onClick={() => openMovieModal(movie)}
                src={movie.Poster}
                alt={movie.imdbID}
              />
              <IconButton
                style={{
                  position: "absolute",
                  zIndex: 2,
                  bottom: -3,
                  right: -3,
                }}
              >
                <BsHeartFill color="#b71a51" />
              </IconButton>
            </div>
          ))}
        </Movies>
      </MobileView>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <Card>
          <IconButton
            style={{
              position: "absolute",
              zIndex: 2,
              top: 0,
              right: 0,
            }}
            onClick={() => setModalOpen(false)}
          >
            <BsX size="30" />
          </IconButton>
          <CardMedia
            component="img"
            image={modalData.Poster}
            title={modalData.imdbID}
          ></CardMedia>
        </Card>
      </Dialog>
      <PaginationContainer>
        <Pagination
          count={100}
          color="primary"
          size={isMobile ? "small" : "medium"}
          showFirstButton
          showLastButton
        />
      </PaginationContainer>
    </ThemeProvider>
  );
};

export default Favorites;
