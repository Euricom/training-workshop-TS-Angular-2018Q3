import axios from 'axios';

export class Movie {
  title: string;
  episodeId: number;
  openingCrawl: string;

  constructor(attr: any) {
    Object.assign(this, attr);
  }
}

function mapMovie(resource: any): any {
  return {
    title: resource.title,
    episodeId: resource.episode_id,
    openingCrawl: resource.opening_crawl,
  };
}

export async function getAllMovies(): Promise<any> {
  const res = await axios.get('https://swapi.co/api/films/');
  return res.data.map((item: any) => {
    return new Movie(mapMovie(item));
  });
}

export async function getMovie(id: number): Promise<any> {
  const res = await axios.get(`https://swapi.co/api/films/${id}`);
  return new Movie(mapMovie(res.data));
}
