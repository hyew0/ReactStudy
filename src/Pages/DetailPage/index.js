import axios from '../../api/axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function DetailPage() {
    const {movieId} = useParams();
    const [movie, setMovie] = React.useState({});
    console.log(movieId);
 
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}`
            ); 
            setMovie(request.data);  
        }
        fetchData();
    }, [movieId]); 
    
    if (!movie) return null;

    return (
    <section>
        <img 
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt="modal__poster-img"
        />
    </section>
  )
}
