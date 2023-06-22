import {useHttp} from '../hooks/http.hook'

const useMarvelService = () => {
  const {loading, request, error, clearError} = useHttp()

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=e857b55234347cfb7f6425f75329ee7f';
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter)
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }

  const getAllComics = async (offset) => {
    const res = await request(`${_apiBase}comics?noVariants=true&hasDigitalIssue=true&limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComic);
  }

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComic(res.data.results[0]);
  }


  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 210)}...` : 'Для этого персонажа нет описания',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }

  const _transformComic = (comic) => {
    return {
      id: comic.id,
      title: comic.title,
      description: comic.description || 'There is no description',
      pageCount: comic.pageCount ? `${comic.pageCount} p.` : 'No information about the number of pages',
      price: comic.prices[0].price ? comic.prices[0].price + '$' : 'Not available' ,
      thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
      language: comic.textObjects.language || 'en-us'
    }
  }

  return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic}
}

export default useMarvelService;