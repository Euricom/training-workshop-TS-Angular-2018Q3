import axios from 'axios';
import { getMovie, Movie } from './movieService';

describe('movieService', () => {
  test('getMovie', async () => {
    // arrange
    const testResponse = {
      data: {
        title: 'myMovie',
        episode_id: 1,
        opening_crawl: 'abc',
      },
    };
    const mock = jest
      .spyOn(axios, 'get')
      .mockReturnValue(Promise.resolve(testResponse));

    // act
    const movie = await getMovie(1);

    // assert
    expect(mock).toBeCalledWith('https://swapi.co/api/films/1');
    expect(movie).toBeInstanceOf(Movie);
    expect(movie.episodeId).toBe(1);
    expect(movie.openingCrawl).toBe('abc');
  });
});
