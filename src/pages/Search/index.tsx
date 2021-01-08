import React, { FormEvent, useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { Form } from "./styles";
import { Movies, Title } from "../../styles/global";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

const Search: React.FC = () => {
  const movies = [
    {
      Title: "Pirates of the Caribbean: The Curse of the Black Pearl",
      Year: "2003",
      imdbID: "tt0325980",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNGYyZGM5MGMtYTY2Ni00M2Y1LWIzNjQtYWUzM2VlNGVhMDNhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    },
    {
      Title: "Pirates of the Caribbean: Dead Man's Chest",
      Year: "2006",
      imdbID: "tt0383574",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTcwODc1MTMxM15BMl5BanBnXkFtZTYwMDg1NzY3._V1_SX300.jpg",
    },
    {
      Title: "Pirates of the Caribbean: At World's End",
      Year: "2007",
      imdbID: "tt0449088",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjIyNjkxNzEyMl5BMl5BanBnXkFtZTYwMjc3MDE3._V1_SX300.jpg",
    },
    {
      Title: "Pirates of the Caribbean: On Stranger Tides",
      Year: "2011",
      imdbID: "tt1298650",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMjE5MjkwODI3Nl5BMl5BanBnXkFtZTcwNjcwMDk4NA@@._V1_SX300.jpg",
    },
    {
      Title: "Pirates of the Caribbean: Dead Men Tell No Tales",
      Year: "2017",
      imdbID: "tt1790809",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTYyMTcxNzc5M15BMl5BanBnXkFtZTgwOTg2ODE2MTI@._V1_SX300.jpg",
    },
  ];

  return (
    <>
      <Title>Cinemapp</Title>
      <Movies>
        {movies.map((movie) => (
          <Link to={`/favorites`}>
            <img src={movie.Poster} alt={movie.imdbID} />
            <div>
              <strong>{movie.Title}</strong>
              <p>Ano: {movie.Year}</p>
            </div>
            <FiHeart size="20" />
          </Link>
        ))}
      </Movies>
    </>
  );
};

export default Search;
