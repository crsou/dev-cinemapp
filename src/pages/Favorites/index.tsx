import React, { useEffect, useState, ChangeEvent } from "react";
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
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageTotal, setPageTotal] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Movie>({
    Title: "",
    imdbID: "",
    Poster: "",
  });
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeMovieData, setRemoveMovieData] = useState<Movie>();

  useEffect(() => {
    setMovies(paginate(moviesList, 1));
    setPageTotal(Math.ceil(moviesList.length / 10));
  }, []);

  function paginate(array: Movie[], index: number) {
    index = index > 0 ? index - 1 : index;
    return [
      ...array.filter((value, n) => {
        return n >= index * 10 && n < (index + 1) * 10;
      }),
    ];
  }

  function filterFavorites(title: string) {
    return movies.filter(
      (item) => item.Title.toLowerCase().indexOf(title.toLowerCase()) > -1
    );
  }

  const changePage = (event: ChangeEvent<unknown>, page: number) => {
    setMovies(paginate(moviesList, page));
  };

  const moviesList = [
    {
      Title: "Harry Potter and the Deathly Hallows: Part 2",
      Year: "2011",
      imdbID: "tt1201607",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
    },
    {
      Title: "Harry Potter and the Sorcerer's Stone",
      Year: "2001",
      imdbID: "tt0241527",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg",
    },
    {
      Title: "Harry Potter and the Chamber of Secrets",
      Year: "2002",
      imdbID: "tt0295297",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTcxODgwMDkxNV5BMl5BanBnXkFtZTYwMDk2MDg3._V1_SX300.jpg",
    },
    {
      Title: "Harry Potter and the Prisoner of Azkaban",
      Year: "2004",
      imdbID: "tt0304141",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_SX300.jpg",
    },
    {
      Title: "Harry Potter and the Goblet of Fire",
      Year: "2005",
      imdbID: "tt0330373",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_SX300.jpg",
    },
    {
      Title: "Harry Potter and the Order of the Phoenix",
      Year: "2007",
      imdbID: "tt0373889",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTM0NTczMTUzOV5BMl5BanBnXkFtZTYwMzIxNTg3._V1_SX300.jpg",
    },
    {
      Title: "Harry Potter and the Deathly Hallows: Part 1",
      Year: "2010",
      imdbID: "tt0926084",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTQ2OTE1Mjk0N15BMl5BanBnXkFtZTcwODE3MDAwNA@@._V1_SX300.jpg",
    },
    {
      Title: "Harry Potter and the Half-Blood Prince",
      Year: "2009",
      imdbID: "tt0417741",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_SX300.jpg",
    },
    {
      Title: "When Harry Met Sally...",
      Year: "1989",
      imdbID: "tt0098635",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjE0ODEwNjM2NF5BMl5BanBnXkFtZTcwMjU2Mzg3NA@@._V1_SX300.jpg",
    },
    {
      Title: "Dirty Harry",
      Year: "1971",
      imdbID: "tt0066999",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMzdhMTM2YTItOWU2YS00MTM0LTgyNDYtMDM1OWM3NzkzNTM2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg",
    },
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
          count={pageTotal}
          color="primary"
          size={isMobile ? "small" : "medium"}
          onChange={changePage}
          showFirstButton
          showLastButton
        />
      </PaginationContainer>
    </ThemeProvider>
  );
};

export default Favorites;
