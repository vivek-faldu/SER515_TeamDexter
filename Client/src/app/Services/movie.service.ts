import { Movie } from "../Components/movie.model";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from "@angular/common/http";
// import { timingSafeEqual } from 'crypto';

/*
* A service Class that acts as centralized repository for handling movie data.
* @Author: Sai Saran Kandimalla.
* @Author: Shilpa Bhat
* @version 1: created on 09/18/2018.
*/
@Injectable()
export class MovieService {
  //Sample data for movies.
  public movies: Movie[] = [];

  constructor(private http: HttpClient) { }

  /* A getter method to get movies.
    * @returns movies: Movie[].
    */
  getMovies() {
    return this.http.get("http://localhost:4241/movies", { responseType: "json" });
  }

  /* A getter method to get movie details */
  getMovieDetails(id: number) {
    return this.http.get("http://localhost:4241/movies/" + id, {
      responseType: "json"
    });
  }

  getSearchedMovieList(movieName: string, details: string) {
    return this.http.get(
      "http://localhost:4241/movies/?type=search&name=" + movieName + "&details=" + details
    );
  }

  getUpcomingMovieList() {
    return this.http.get("http://localhost:4241/movies/?type=upcoming", {
      responseType: "json"
    });
  }

  getSimilarMovies(id: number) {
    return this.http.get(
      "http://localhost:4241/movies/" + id + "/?type=similar",
      {
        responseType: "json"
      }
    );
  }
}
