import { useEffect, useState } from "react";
import "./Content.css";
import { ContentProps, Movie, MovieSplit, MovieVisibility, ResponseMovie } from "./content.types";

const Content = ({ content }: ContentProps) => {

    const [data, setData] = useState<MovieSplit>({});
    const [visbility, setVisibility] = useState<MovieVisibility>({});

    useEffect(() => {
        const getData = (searchKey: string) => {
            const apiKey = import.meta.env.VITE_API_KEY;
            console.log(apiKey)
            const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${searchKey}`;
    
            let mutatedResponseData: Movie[] = [];
    
            fetch(url)
                .then((response) => {
                    return response.json()
                }).then((data) => {
                    mutatedResponseData = data?.Search.map((element: ResponseMovie) => {
                        return {
                            'title': element.Title,
                            'year': Number(element.Year)
                        }
                    })
    
                    const sortedByYears = mutatedResponseData
                        .filter((el: Movie) => !isNaN(el.year))
                        .sort((a: Movie, b: Movie) => b.year - a.year);
    
                    const decades: number[] = [];
                    const startingDecade = Math.floor(sortedByYears[0].year / 10) * 10; 
                    for (let i = 0; i < 4; i++) {
                        decades.push(startingDecade - (i * 10));
                    }
    
                    const moviesSplitByDecades: MovieSplit = {}
                    const moviesVisibility: MovieVisibility = {}
                    for (const index in decades) {
                        const allMoviesFromThatDecade = sortedByYears.filter(
                            (el: Movie) =>
                                el.year <= decades[index] &&
                                el.year >= decades[index] - 10)
                        
                        moviesSplitByDecades[decades[index]] = allMoviesFromThatDecade
                        moviesVisibility[decades[index]] = 3
                    }
                    
                    setData(moviesSplitByDecades)
                    setVisibility(moviesVisibility)

                    console.log("Data type: ",moviesSplitByDecades)
                }).catch((e: Error) => {
                    console.log("Error: ", e)
                    alert('The key you search does not return a value.')
            })
        }

        getData(content);
    }, [content])

    const handleLoadMore = (movieKey: number) => {
        const clone = {...visbility}
        const newVisibility = visbility[movieKey] + 3
        clone[movieKey] = newVisibility

        setVisibility(clone)
    }

    return (
        <div>
            {Object.keys(data).map((decade) => {
                const movieKey = Number(decade);
                const movies = data[movieKey];
                return (
                    <>
                        <div key={decade} className="container">
                            <h2>{decade}s</h2>
                            <ul>
                                {movies.slice(0, visbility[movieKey]).map((movie, index) => (
                                    <li key={index}>
                                        <div> { movie.title } - { movie.year} </div>
                                    </li>
                                ))}
                            </ul>
                            {
                                movies.length > visbility[movieKey] &&
                                <button onClick={() => handleLoadMore(movieKey)}> Load more </button>
                            }
                        </div>
                    </>
                );
            })}
        </div>
    )
}

export default Content;