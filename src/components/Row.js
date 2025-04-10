import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import './Row.css'
import MovieModal from './MovieModal'

import { Navigation,Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                loop={true} //loop 기능을 사용할 것인지
                navigation //arrow 버튼 사용 유무
                pagination={{ clickable: true }} //page 버튼 보이게 할지
                breakpoints={{
                    1378: {
                        slidesPerView: 6,
                        slidesPerGroup: 6,
                    },
                    998: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                    },
                    625:{
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                    0: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    }
                }}
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <img 
                            onClick={() => handleClick(movie)}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src={`${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            loading="lazy"
                            alt={movie.title || movie.name || movie.original_name}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
                



            {/* <div className="slider">
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

            </div> */}


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