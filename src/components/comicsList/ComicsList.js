import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newComicLoading, setNewComicLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicEnded, setComicEnded] = useState(false);

  const {loading, error, getAllComics} = useMarvelService();

  useEffect(() => {
    onRequest(offset, true)
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setNewComicLoading(false) : setNewComicLoading(true)
    getAllComics(offset)
      .then(onComicsListLoaded)
  }

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if(newComicsList.length < 8) {
      ended = true;
    }

    setComicsList(comicsList => [...comicsList, ...newComicsList])
    setNewComicLoading(false)
    setOffset(offset => offset + 8)
    setComicEnded(ended)
  }

  const renderComics = (arr) => {
    const items = arr.map(item => {
      
      return(
        <li key={item.id} className="comics__item">
          <Link to={`/comics/${item.id}`}>
            <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>  
      )
    })

    return(
      <ul className="comics__grid">
        {items}
      </ul>
    )
  }

  const items = renderComics(comicsList);
  const spinner = loading && !newComicLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className="comics__list">
      {spinner}
      {items}
      {errorMessage}
      <button 
        className="button button__main button__long"
        disabled={newComicLoading}
        onClick={() => onRequest(offset)}
        style={{'display': comicEnded ? 'none' : 'block'}}>
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default ComicsList;