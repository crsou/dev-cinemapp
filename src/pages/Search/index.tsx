import React, { FormEvent, useEffect, useState } from "react";
import { BsHeart, BsHeartFill, BsSearch, BsX } from "react-icons/bs";
import { Link } from "react-router-dom";
import api from "../../services/api";
import {
  Header,
  Searchbar,
  Movies,
  PaginationContainer,
} from "../../styles/global";
import {
  Card,
  CardMedia,
  Checkbox,
  Dialog,
  IconButton,
} from "@material-ui/core";
import { Pagination, Skeleton } from "@material-ui/lab";
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

const Search: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Movie>({
    Title: "",
    imdbID: "",
    Poster: "",
  });

  function openMovieModal(movie: Movie) {
    setModalOpen(true);
    setModalData(movie);
  }

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

  return (
    <ThemeProvider theme={theme}>
      <Header>
        <h1>Cinema App</h1>
        <Link to="/favorites">
          <BsHeartFill color="#b71a51" size="17" />
          Favoritos
        </Link>
      </Header>
      <Searchbar>
        <input placeholder="Procure por filmes" />
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
              <Checkbox
                style={{
                  position: "absolute",
                  zIndex: 2,
                  bottom: 0,
                  right: 0,
                }}
                color="primary"
                checkedIcon={<BsHeartFill color="#b71a51" />}
                icon={<BsHeart color="#fff" />}
              />
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
              <Checkbox
                style={{
                  position: "absolute",
                  zIndex: 2,
                  bottom: 0,
                  right: 0,
                }}
                color="primary"
                checkedIcon={<BsHeartFill color="#b71a51" />}
                icon={<BsHeart color="#fff" />}
              />
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
              <Checkbox
                style={{
                  position: "absolute",
                  zIndex: 2,
                  bottom: 0,
                  right: 0,
                }}
                color="primary"
                checkedIcon={<BsHeartFill color="#b71a51" />}
                icon={<BsHeart color="#fff" />}
              />
            </div>
          ))}
        </Movies>

        {/* {Array.from(new Array(5)).map(() => (
            <Skeleton
              style={{ margin: 7.5, borderRadius: 5 }}
              variant="rect"
              width={150}
              height={200}
            />
          ))} */}
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

export default Search;
