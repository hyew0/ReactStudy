import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import './Row.css'
import MovieModal from './MovieModal'

const Row =({title, fetchUrl, isLargeRow, id}) => {
    const [movies, setMovies] = useState([]);

    /* movie modal 부분 */
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

    const BASE_URL = "https://image.tmdb.org/t/p/original/";

    useEffect( () => {
        fetchMovieData();
    }, [fetchUrl]);

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        return request;
    }

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    }


    return (
        <section className="row">
            <h2>{title}</h2>
            <div className="slider">
                <div 
                    className="slider__arrow-left"
                    onClick={() => {
                        document.getElementById(id).scrollLeft -= window.innerWidth - 80;
                    }}
                >
                    <span className="arrow">
                        {"<"}
                    </span>
                </div>

                <div id={id} className="row__posters">
                    {movies.map((movie) => (
                        <img 
                            key = {movie.id}
                            onClick={() => handleClick(movie)}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src={`${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            loading="lazy"
                            alt={movie.name}
                        />
                    ))}
                </div>

                <div 
                    className="slider__arrow-right"
                    onClick={() => {
                        document.getElementById(id).scrollLeft += window.innerWidth - 80;
                    }}
                >
                    <span className="arrow">
                        {">"}
                    </span>
                </div>

            </div>

            {
                modalOpen && (
                    <MovieModal 
                    {...movieSelected}
                        setModalOpen={setModalOpen}
                    />
                )
            }
        </section>
    )
}

export default Row