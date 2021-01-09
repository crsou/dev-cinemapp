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
  Year: string;
  imdbID: string;
  Type: string;
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
    Year: "",
    imdbID: "",
    Type: "",
    Poster: "",
  });

  function openMovieModal(movie: Movie) {
    setModalOpen(true);
    setModalData(movie);
  }

  const movies = [
    {
      Title: "The Lord of the Rings: The Fellowship of the Ring",
      Year: "2001",
      imdbID: "tt0120737",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
    },
    {
      Title: "The Lord of the Rings: The Return of the King",
      Year: "2003",
      imdbID: "tt0167260",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    },
    {
      Title: "The Lord of the Rings: The Two Towers",
      Year: "2002",
      imdbID: "tt0167261",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
      Title: "Rings",
      Year: "2017",
      imdbID: "tt0498381",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYTQzZjhiYjYtNDMzOS00ZjNiLTg2MGMtYWZmYWNjN2U5YTVmXkEyXkFqcGdeQXVyNjI3OTcxOTU@._V1_SX300.jpg",
    },
    {
      Title: "The Lord of the Rings",
      Year: "1978",
      imdbID: "tt0077869",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BOGMyNWJhZmYtNGQxYi00Y2ZjLWJmNjktNTgzZWJjOTg4YjM3L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
    },
    {
      Title: "The Postman Always Rings Twice",
      Year: "1981",
      imdbID: "tt0082934",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BZGE2OWVhYzgtMTRmYS00NjI0LTg3MGItZDlkN2Q3ZTQ5MzgxXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg",
    },
    {
      Title: "The Postman Always Rings Twice",
      Year: "1946",
      imdbID: "tt0038854",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNTUzODE2Mzg3NF5BMl5BanBnXkFtZTgwNTE1MDkxMTE@._V1_SX300.jpg",
    },
    {
      Title: "The Lord of the Rings: The Two Towers",
      Year: "2002",
      imdbID: "tt0347436",
      Type: "game",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BODI0Mzk3OTM4N15BMl5BanBnXkFtZTgwMTM4MTk4MDE@._V1_SX300.jpg",
    },
    {
      Title: "Rings",
      Year: "2005",
      imdbID: "tt0449092",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BYjViNTY5ZTAtNjgzNS00M2JkLThmMTYtMTQxZjc5MWMyZDk0L2ltYWdlXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_SX300.jpg",
    },
    {
      Title: "The Lord of the Rings: The Return of the King",
      Year: "2003",
      imdbID: "tt0387360",
      Type: "game",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjE5NTQwMTY5MV5BMl5BanBnXkFtZTgwODcwNjUwMTE@._V1_SX300.jpg",
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
          {movies.map(
            (movie) =>
              movie.Type === "movie" && (
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
              )
          )}
        </Movies>
      </BrowserView>
      <MobileView>
        <Movies isMobile={isMobile}>
          {movies.slice(0, 5).map(
            (movie) =>
              movie.Type === "movie" && (
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
              )
          )}
        </Movies>
        <Movies isMobile={isMobile}>
          {movies.slice(5, 10).map(
            (movie) =>
              movie.Type === "movie" && (
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
              )
          )}
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
