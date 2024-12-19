export type ResponseMovie = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}

export type Movie = {
    title: string,
    year: number
}

export type MovieSplit = {
    [key: number]: Movie[]
}

export type MovieVisibility = {
    [key: number]: number
}

export interface ContentProps {
    content: string;
}