import React, { useState, useEffect } from 'react';

import config from './config';
import api from './services/api';
import requests from './requests';

import './Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(requests.fetchNetflixOriginals);
      setMovie(response.data.results[Math.floor(Math.random() * response.data.results.length - 1)]);
    };

    fetchData();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("${config.baseImageURL}${movie?.backdrop_path}")`,
        backgroundPosition: 'cente top',
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">{movie?.name ?? movie?.name ?? movie?.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        <p className="banner__description">{truncate(movie?.overview, 150)}</p>
      </div>

      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
