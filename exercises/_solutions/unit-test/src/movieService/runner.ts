import { getMovie, Movie } from './movieService';

getMovie(1).then((result) => {
  console.log(result);
  console.log(result instanceof Movie);
});
