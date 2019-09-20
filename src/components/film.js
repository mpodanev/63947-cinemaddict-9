import AbstractComponent from './abstract-component';

export default class Film extends AbstractComponent {
  constructor({title, image, description, rating, year, genre, comments, isFavorite, isWatched, isAddedToWachlist}) {
    super();
    this._title = title;
    this._image = image;
    this._description = description;
    this._rating = rating;
    this._year = year;
    this._genre = genre;
    this._comments = comments;
    this._isFavorite = isFavorite;
    this._isWatched = isWatched;
    this._isAddedToWachlist = isAddedToWachlist;
  }

  getTemplate() {
    return `<article class="film-card">
    <h3 class="film-card__title">${this._title}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${this._year}</span>
      <span class="film-card__duration">1h 55m</span>
      <span class="film-card__genre">${this._genre}</span>
    </p>
    <img src="${this._image}" alt="" class="film-card__poster">
    <p class="film-card__description">${this._description}</p>
    <a class="film-card__comments">${this._comments.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isAddedToWachlist ? `film-card__controls-item--active` : ``}" data-controll="AddToWatchlist" title="Add to watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isWatched ? `film-card__controls-item--active` : ``}" data-controll="Watched" title="Mark as watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorite ? `film-card__controls-item--active` : ``}" data-controll="Favorite" title="Mark as favorite">Mark as favorite</button>
    </form>
  </article>`;
  }
}
