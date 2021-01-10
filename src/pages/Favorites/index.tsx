import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import { BsSearch, BsX } from "react-icons/bs";
import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import FavoriteButton from "../../components/FavoriteButton";
import MovieModal from "../../components/MovieModal";
import {
  Header,
  ErrorMessage,
  Movies,
  PaginationContainer,
  Searchbar,
} from "../../styles/global";
import { error } from "console";

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

const Favorites: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Movie>({
    Title: "",
    Year: "",
    imdbID: "",
    Type: "",
    Poster: "",
  });
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeMovieData, setRemoveMovieData] = useState<Movie>({
    Title: "",
    Year: "",
    imdbID: "",
    Type: "",
    Poster: "",
  });
  const [toastOpen, setToastOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let savedFavorites = localStorage.getItem("@favorites");
    if (savedFavorites && savedFavorites.length > 0) {
      setError("");
      setFavorites(JSON.parse(savedFavorites));
      loadPage(JSON.parse(savedFavorites), 1);
    } else {
      setError("Você ainda não adicionou nenhum favorito...");
    }
  }, []);

  function loadPage(list: Movie[], page: number) {
    setCurrentPage(page);
    setMovies(paginate(list, 1));
    if (list.length === 0) {
      setError("Filme não encontrado.");
    } else {
      setError("");
    }
    setPageTotal(Math.ceil(list.length / 10));
  }

  function paginate(array: Movie[], index: number) {
    index = index > 0 ? index - 1 : index;
    return [
      ...array.filter((value, n) => {
        return n >= index * 10 && n < (index + 1) * 10;
      }),
    ];
  }

  function handleFilterSearch(event: FormEvent) {
    event.preventDefault();
    loadPage(filterFavorites(searchInput), 1);
  }

  function filterFavorites(title: string) {
    return favorites.filter(
      (item) => item.Title.toLowerCase().indexOf(title.toLowerCase()) > -1
    );
  }

  const changePage = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    setMovies(paginate(favorites, page));
  };

  function openMovieModal(movie: Movie) {
    setModalOpen(true);
    setModalData(movie);
  }

  function openRemoveDialog(movie: Movie) {
    setModalOpen(false);
    setRemoveDialogOpen(true);
    setRemoveMovieData(movie);
  }

  function unFavorite(movie: Movie) {
    let aux = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    setFavorites(aux);
    setMovies(paginate(aux, currentPage));
    if (aux.length === 0) {
      localStorage.removeItem("@favorites");
      setError("Você enjoou de todos os seus favoritos. :(");
    } else {
      localStorage.setItem("@favorites", JSON.stringify(aux));
    }
    setRemoveDialogOpen(false);
    showToast();
  }

  function reFavorite(movie: Movie) {
    let aux = [...favorites, movie];
    setFavorites(aux);
    setMovies(paginate(aux, currentPage));
    localStorage.setItem("@favorites", JSON.stringify(aux));
    setError("");
    setToastOpen(false);
  }

  function showToast() {
    setToastOpen(true);
    setTimeout(() => {
      setToastOpen(false);
    }, 5000);
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
      <Searchbar onSubmit={handleFilterSearch}>
        <input
          placeholder="Procure por seu favorito"
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
              {movies.map((movie) => (
                <div>
                  <img
                    onClick={() => openMovieModal(movie)}
                    src={movie.Poster}
                    alt={movie.imdbID}
                  />
                  <FavoriteButton
                    modal={false}
                    favorite={true}
                    toggle={() => openRemoveDialog(movie)}
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
                  <FavoriteButton
                    modal={false}
                    favorite={true}
                    toggle={() => openRemoveDialog(movie)}
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
                  <FavoriteButton
                    modal={false}
                    favorite={true}
                    toggle={() => openRemoveDialog(movie)}
                  />
                </div>
              ))}
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
            favorite={true}
            toggle={() => openRemoveDialog(modalData)}
          />
        </MovieModal>
      </Dialog>
      <Dialog
        open={removeDialogOpen}
        onClose={() => setRemoveDialogOpen(false)}
      >
        <DialogTitle id="alert-dialog-title">
          {removeMovieData.Title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja remover este filme dos seus favoritos?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setRemoveDialogOpen(false)}
            color="secondary"
          >
            Não
          </Button>
          <Button
            variant="contained"
            onClick={() => unFavorite(removeMovieData)}
            color="primary"
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={toastOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={() => setToastOpen(false)}
        message={`Você enjoou de ${removeMovieData.Title}... :(`}
        action={
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => reFavorite(removeMovieData)}
          >
            Desfazer
          </Button>
        }
      />

      {!error && (
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

export default Favorites;
