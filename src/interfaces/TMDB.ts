interface IBelongToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface IGenre {
  id: number;
  name: string;
}

interface ICompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ICountry {
  production_countries: string;
  name: string;
}

interface ILanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface IPersonCredits {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
}

interface IActor extends IPersonCredits {
  cast_id: number;
  character: string;
  order: number;
}

interface ICrew extends IPersonCredits {
  department: string;
  job: string;
}

interface ICredits {
  cast: IActor[];
  crew: ICrew[];
}

interface IVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

interface IVideos {
  results: IVideo[];
}

interface ICast {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IResponseTMDB {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovieDetailTMDB {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: IBelongToCollection;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ICompany[];
  production_countries: ICountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ILanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: ICredits;
  videos: IVideos;
}

export interface IMovieDetailResponse {
  id: number;
  poster_path: string;
  vote_average: number;
  title: string;
  genres: IGenre[];
  trailer: string;
  release_date: string;
  runtime: string;
  overview: string;
  spoken_languages: string;
  production_countries: string;
  cast: ICast[];
  // adult: boolean;
  // backdrop_path: string;
  // belongs_to_collection: IBelongToCollection;
  // budget: number;
  // homepage: string;
  // imdb_id: string;
  // origin_country: string[];
  // original_language: string;
  // original_title: string;
  // popularity: number;
  // production_companies: ICompany[];
  // revenue: number;
  // status: string;
  // tagline: string;
  // video: boolean;
  // vote_count: number;
  // videos: IVideos;
}
