import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Dialog, IconButton } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import { BsHeartFill, BsSearch, BsX } from "react-icons/bs";
import { Link } from "react-router-dom";
import FavoriteButton from "../../components/FavoriteButton";
import MovieModal from "../../components/MovieModal";
import api from "../../services/api";
import {
  Header,
  ErrorMessage,
  Movies,
  PaginationContainer,
  Searchbar,
} from "../../styles/global";

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
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadedPages, setLoadedPages] = useState<Movie[][]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchedMovie, setSearchedMovie] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Movie>({
    Title: "",
    Year: "",
    imdbID: "",
    Type: "",
    Poster: "",
  });
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [error, setError] = useState("");

  const isFavorited = (fav: Movie, movieItem: Movie) =>
    fav.imdbID === movieItem.imdbID;

  useEffect(() => {
    let savedFavorites = localStorage.getItem("@favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  async function loadNewPage(page: number, title: string) {
    try {
      const { data } = await api.get(`${title}&page=${page}`);
      if (data.Response === "True") {
        setError("");
        let auxList: Movie[][] = [];
        if (title === searchedMovie) {
          auxList = loadedPages;
        } else {
          setCurrentPage(1);
        }

        auxList[page - 1] = data.Search;

        setMovies(data.Search);
        setLoadedPages(auxList);
        setPageTotal(Math.ceil(data.totalResults / 10));
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError("Houve algum problema com a API ou sua conexão.");
      console.log(err);
    }
  }

  function toggleFavorite(movie: Movie) {
    if (favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      let aux = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
      setFavorites(aux);
      if (aux.length === 0) {
        localStorage.removeItem("@favorites");
      } else {
        localStorage.setItem("@favorites", JSON.stringify(aux));
      }
    } else {
      let aux = [...favorites, movie];
      setFavorites(aux);
      localStorage.setItem("@favorites", JSON.stringify(aux));
    }
  }

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    setSearchedMovie(searchInput);
    loadNewPage(1, searchInput);
  }

  const changePage = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    if (!loadedPages[page - 1]) {
      loadNewPage(page, searchedMovie);
    } else {
      setCurrentPage(page);
      setMovies(loadedPages[page - 1]);
    }
  };

  function openMovieModal(movie: Movie) {
    setModalOpen(true);
    setModalData(movie);
  }

  return (
    <ThemeProvider theme={theme}>
      <Header>
        <h1>Cinema App</h1>
        <Link to="/favorites">
          <BsHeartFill color="#b71a51" size="17" />
          Favoritos
        </Link>
      </Header>
      <Searchbar onSubmit={handleSearch}>
        <input
          placeholder="Procure por filmes"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">
          <BsSearch color="#fff" />
        </button>
      </Searchbar>
      {!error ? (
        <>
          <BrowserView>
            <Movies isMobile={isMobile}>
              {movies.map(
                (movie) =>
                  movie.Type === "movie" &&
                  movie.Poster !== "N/A" && (
                    <div key={movie.imdbID}>
                      <img
                        onClick={() => openMovieModal(movie)}
                        src={movie.Poster}
                        alt={movie.Title}
                      />
                      <FavoriteButton
                        modal={false}
                        favorite={favorites.some((fav) =>
                          isFavorited(fav, movie)
                        )}
                        toggle={() => toggleFavorite(movie)}
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
                  movie.Type === "movie" &&
                  movie.Poster !== "N/A" && (
                    <div key={movie.imdbID}>
                      <img
                        onClick={() => openMovieModal(movie)}
                        src={movie.Poster}
                        alt={movie.Title}
                      />
                      <FavoriteButton
                        modal={false}
                        favorite={favorites.some((fav) =>
                          isFavorited(fav, movie)
                        )}
                        toggle={() => toggleFavorite(movie)}
                      />
                    </div>
                  )
              )}
            </Movies>
            <Movies isMobile={isMobile}>
              {movies.slice(5, 10).map(
                (movie) =>
                  movie.Type === "movie" &&
                  movie.Poster !== "N/A" && (
                    <div key={movie.imdbID}>
                      <img
                        onClick={() => openMovieModal(movie)}
                        src={movie.Poster}
                        alt={movie.Title}
                      />
                      <FavoriteButton
                        modal={false}
                        favorite={favorites.some((fav) =>
                          isFavorited(fav, movie)
                        )}
                        toggle={() => toggleFavorite(movie)}
                      />
                    </div>
                  )
              )}
            </Movies>
          </MobileView>
        </>
      ) : (
        <ErrorMessage>{error}</ErrorMessage>
      )}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <MovieModal
          Title={modalData.Title}
          Poster={modalData.Poster}
          Year={modalData.Year}
          imdbID={modalData.imdbID}
        >
          <IconButton onClick={() => setModalOpen(false)}>
            <BsX size="30" />
          </IconButton>
          <FavoriteButton
            modal={true}
            favorite={favorites.some((fav) => isFavorited(fav, modalData))}
            toggle={() => toggleFavorite(modalData)}
          />
        </MovieModal>
      </Dialog>
      {loadedPages[0] && !error && (
        <PaginationContainer>
          <Pagination
            count={pageTotal}
            page={currentPage}
            color="primary"
            size={isMobile ? "small" : "medium"}
            onChange={changePage}
            showFirstButton
            showLastButton
          />
        </PaginationContainer>
      )}
    </ThemeProvider>
  );
};

export default Search;
