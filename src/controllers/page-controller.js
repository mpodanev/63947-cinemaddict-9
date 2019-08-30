import Film from '../components/film';
import FilmPopup from '../components/filmPopup';
import {render, unrender, Position} from '../utils';
import SectionFilms from '../components/section-films';
import NoFilmsMessage from '../components/noFilmsMessage';

export default class PageController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._sectionFilms = new SectionFilms();
    this._noFilmsMessage = new NoFilmsMessage();
  }

  init() {
    render(this._container, this._sectionFilms.getElement(), Position.BEFOREEND);

    render(this._sectionFilms.getElement(), this._noFilmsMessage.getElement(), Position.AFTERBEGIN);

    this._tasks.forEach((taskMock) => this._renderFilm(taskMock));

  }

  _renderFilm(film) {
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
    render(this._sectionFilms.getElement().querySelector(`.films-list__container`), filmComponent.getElement(), Position.BEFOREEND);
  }
}
