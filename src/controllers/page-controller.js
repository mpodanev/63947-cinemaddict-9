import {render, unrender, Position} from '../utils';
import SectionFilms from '../components/section-films';

import SortSection from '../components/sort';
import MovieController from './movie-controller';

export default class PageController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
    this._sectionFilms = new SectionFilms();

    this._sortSection = new SortSection();
    this._topRatedFilms = this._films.slice().sort((a, b) => b.rating - a.rating);
    this._mostCommentedFilms = this._films.slice().sort((a, b) => b.comments.length - a.comments.length);

    this._subscriptions = [];
    // this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(this._container, this._sortSection.getElement(), Position.BEFOREEND);
    render(this._container, this._sectionFilms.getElement(), Position.BEFOREEND);

    this._films.forEach((taskMock) => this._renderFilm(taskMock));

    this._topRatedFilms.slice(0, 2).forEach((taskMock) => this._renderTopRatedFilms(taskMock));
    this._mostCommentedFilms.slice(0, 2).forEach((taskMock) => this._renderMostCommentedFilm(taskMock));

    this._sortSection.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  _renderPage() {
    unrender(this._sectionFilms.getElement());
    this._sectionFilms.removeElement();

    this._topRatedFilms = this._films.slice().sort((a, b) => b.rating - a.rating);
    this._mostCommentedFilms = this._films.slice().sort((a, b) => b.comments.length - a.comments.length);

    render(this._container, this._sectionFilms.getElement(), Position.BEFOREEND);
    this._films.forEach((taskMock) => this._renderFilm(taskMock));

    this._topRatedFilms.slice(0, 2).forEach((taskMock) => this._renderTopRatedFilms(taskMock));
    this._mostCommentedFilms.slice(0, 2).forEach((taskMock) => this._renderMostCommentedFilm(taskMock));
  }


  _renderFilm(film) {
    // eslint-disable-next-line
    new MovieController(this._sectionFilms.getElement().querySelector(`.films-list__container`), film, this._onDataChange, this._onChangeView);
  }

  _renderTopRatedFilms(film) {
    // eslint-disable-next-line
    new MovieController(this._sectionFilms.getElement().querySelectorAll(`.films-list__container`)[1], film, this._onDataChange, this._onChangeView);
  }

  _renderMostCommentedFilm(film) {
    // eslint-disable-next-line
    new MovieController(this._sectionFilms.getElement().querySelectorAll(`.films-list__container`)[2], film, this._onDataChange, this._onChangeView);
  }

  _onDataChange(newData, oldData) {
    this._films[this._films.findIndex((it) => it === oldData)] = newData;
    this._renderPage();
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
