import Film from '../components/film';
import FilmPopup from '../components/filmPopup';
import {render, unrender, Position} from '../utils';
import SectionFilms from '../components/section-films';
import NoFilmsMessage from '../components/noFilmsMessage';
import SortSection from '../components/sort';

export default class PageController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
    this._sectionFilms = new SectionFilms();
    this._noFilmsMessage = new NoFilmsMessage();
    this._sortSection = new SortSection();
    this._topRatedFilms = this._films.slice().sort((a, b) => b.rating - a.rating);
    this._mostCommentedFilms = this._films.slice().sort((a, b) => b.comments - a.comments);
  }

  init() {
    render(this._container, this._sortSection.getElement(), Position.BEFOREEND);
    render(this._container, this._sectionFilms.getElement(), Position.BEFOREEND);
    render(this._sectionFilms.getElement(), this._noFilmsMessage.getElement(), Position.AFTERBEGIN);

    this._films.forEach((taskMock) => this._renderFilm(taskMock, this._sectionFilms.getElement().querySelector(`.films-list__container`)));
    this._topRatedFilms.slice(0, 2).forEach((taskMock) => this._renderFilm(taskMock, this._sectionFilms.getElement().querySelectorAll(`.films-list__container`)[1]));
    this._mostCommentedFilms.slice(0, 2).forEach((taskMock) => this._renderFilm(taskMock, this._sectionFilms.getElement().querySelectorAll(`.films-list__container`)[2]));
    this._sortSection.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }


  _renderFilm(film, container) {
    const filmComponent = new Film(film);
    const filmPopupComponent = new FilmPopup(film);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        unrender(filmPopupComponent.getElement());
        filmPopupComponent.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmComponent.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, () => {
        render(document.querySelector(`body`), filmPopupComponent.getElement(), Position.BEFOREEND);
        document.addEventListener(`keydown`, onEscKeyDown);

        filmPopupComponent.getElement().querySelector(`.film-details__close-btn`)
          .addEventListener(`click`, () => {
            unrender(filmPopupComponent.getElement());
            filmPopupComponent.removeElement();
            document.removeEventListener(`keydown`, onEscKeyDown);
          });
        filmPopupComponent.getElement().querySelector(`.film-details__comment-input`)
          .addEventListener(`focus`, () => {
            document.removeEventListener(`keydown`, onEscKeyDown);
          });

        filmPopupComponent.getElement().querySelector(`.film-details__comment-input`)
          .addEventListener(`blur`, () => {
            document.addEventListener(`keydown`, onEscKeyDown);
          });
      });


    if (this._noFilmsMessage._element) {
      unrender(this._noFilmsMessage.getElement());
      this._noFilmsMessage.removeElement();
    }
    render(container, filmComponent.getElement(), Position.BEFOREEND);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }
    const sortLinks = this._sortSection.getElement().querySelectorAll(`a`);
    this._sectionFilms.getElement().querySelector(`.films-list__container`).innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date`:
        const sortByDate = this._films.slice().sort((a, b) => a.year - b.year);
        sortByDate.forEach((taskMock) => this._renderFilm(taskMock, this._sectionFilms.getElement().querySelector(`.films-list__container`)));
        sortLinks.forEach((link) => link.classList.remove(`sort__button--active`));
        evt.target.classList.add(`sort__button--active`);
        break;
      case `rating`:
        const sortByRating = this._films.slice().sort((a, b) => a.rating - b.rating);
        sortByRating.forEach((taskMock) => this._renderFilm(taskMock, this._sectionFilms.getElement().querySelector(`.films-list__container`)));
        sortLinks.forEach((link) => link.classList.remove(`sort__button--active`));
        evt.target.classList.add(`sort__button--active`);
        break;
      case `default`:
        this._films.forEach((taskMock) => this._renderFilm(taskMock, this._sectionFilms.getElement().querySelector(`.films-list__container`)));
        sortLinks.forEach((link) => link.classList.remove(`sort__button--active`));
        evt.target.classList.add(`sort__button--active`);
        break;
    }
  }
}
