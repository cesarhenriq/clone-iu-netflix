import React, { useState, useEffect } from 'react';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

import api from './services/api';
import config from './config';

import defaultImagePoster from './assets/images/default.png';
import defaultImageBackDrop from './assets/images/default-backdrop.png';

import './Row.css';

const posterPath = (movie) => {
  if (movie.poster_path) {
    return `${config.baseImageURL}${movie.poster_path}`;
  }

  return defaultImagePoster;
};

const backDropPath = (movie) => {
  if (movie.backdrop_path) {
    return `${config.baseImageURL}${movie.backdrop_path}`;
  }

  return defaultImageBackDrop;
};

const Row = ({ title, fetchURL, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(fetchURL);
      setMovies(response.data.results);
    };
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || '')
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams);
          setTrailerUrl(urlParams.get('v'));
        })
        .catch((error) => {
          console.error(error);
          alert('Trailer não encontrado');
          setTrailerUrl('');
        });
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            key={movie.id}
            onClick={() => handleClick(movie)}
            src={isLargeRow ? posterPath(movie) : backDropPath(movie)}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId="" opts={opts} />}
    </div>
  );
};

export default Row;
