import { useState, useEffect } from 'react';

import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charInfo.scss';

function CharInfo(props) {
  const [char, setChar] = useState(null)

  const {loading, error, getCharacter, clearError}  = useMarvelService()

  useEffect(() => {
    updateChar()
  }, [props.charId])

  const updateChar = () => {
    clearError()
    const {charId} = props;
    if (!charId) {
      return
    }

    getCharacter(charId)
      .then(onCharLoaded)
  }

  const onCharLoaded = (char) => {
    setChar(char)
  }

  const skeleton = error || loading || char ? null: <Skeleton />;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char}/> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {spinner}
      {content}
      {errorMessage}
    </div>
  )
}

const View = ({char}) => {
  const {name, description, thumbnail, homepage, wiki, comics} = char;
  let imgStyle = {'objectFit': 'cover'};
      if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'unset'};
      }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {
          comics.length ? 
          comics.map((item, index) => {
            if (index < 10) {
              return(
                <li key={index} className="char__comics-item">
                  {item.name}
                </li>
              )
            } 
          }) :
          'Для этого персонажа комиксы не найдены'
        }
      </ul>
    </>
  )
}

export default CharInfo;