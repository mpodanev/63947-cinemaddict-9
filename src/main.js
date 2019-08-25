import {createHeaderSearch} from './components/headerSearchTemplate';
import {createHeaderProfileTemplate} from './components/headerProfileTemplate';
import {createMainNavigationTemplate} from './components/mainNavigationTemplate';
import {createSortTemplate} from './components/sortTemplate';
import {createFilmsTemplate} from './components/filmsTemplate';
import {createShowMoreBtnTemplate} from './components/showMoreBtnTemplate';
import {getFilmData} from './filmData';
import {getFilters} from './filtersData';
import Film from './components/film';
import FilmPopup from './components/filmPopup';
import {Position, render, unrender, createElement} from './utils';
import NoFilmsMessage from './components/noFilmsMessage';


const bodyElement = document.querySelector(`body`);
const filmsContainer = document.querySelector(`.films-list__container`);
const additionalFilmsContainer = document.querySelectorAll(`.films-list--extra .films-list__container`);
const MAIN_FILMS_LIST_COUNT = 5;
const ADDITIONAL_FILMS_LIST_COUNT = 2;

const noFilmsMessage = new NoFilmsMessage();
render(filmsContainer, noFilmsMessage.getElement(), Position.BEFOREEND);

const filmMocks = new Array(MAIN_FILMS_LIST_COUNT).fill(``).map(getFilmData);
const filmMocksAdditional = new Array(ADDITIONAL_FILMS_LIST_COUNT).fill(``).map(getFilmData);

const renderFilm = (filmMock, container) => {
  const film = new Film(filmMock);
  const filmPopup = new FilmPopup(filmMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      unrender(filmPopup.getElement());
      filmPopup.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  film.getElement().querySelector(`.film-card__comments`)
    .addEventListener(`click`, () => {
      render(bodyElement, filmPopup.getElement(), Position.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);

      filmPopup.getElement().querySelector(`.film-details__close-btn`)
        .addEventListener(`click`, () => {
          unrender(filmPopup.getElement());
          filmPopup.removeElement();
          document.removeEventListener(`keydown`, onEscKeyDown);
        });
    });

  filmPopup.getElement().querySelector(`.film-details__comment-input`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  filmPopup.getElement().querySelector(`.film-details__comment-input`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  if (noFilmsMessage._element) {
    unrender(noFilmsMessage.getElement());
    noFilmsMessage.removeElement();
  }
  render(container, film.getElement(), Position.BEFOREEND);
};

filmMocks.forEach((filmMock) => renderFilm(filmMock, filmsContainer));
filmMocksAdditional.forEach((filmMock) => renderFilm(filmMock, additionalFilmsContainer[0]));
filmMocksAdditional.forEach((filmMock) => renderFilm(filmMock, additionalFilmsContainer[1]));

// renderTemplates(headerElement, createHeaderSearch(), `beforeend`);
// renderTemplates(headerElement, createHeaderProfileTemplate(), `beforeend`);
// renderTemplates(mainElement, createMainNavigationTemplate(getFilters()), `beforeend`);
// renderTemplates(mainElement, createSortTemplate(), `beforeend`);
// renderTemplates(mainElement, createFilmsTemplate(), `beforeend`);

// const filmsListContainerElement = document.querySelectorAll(`.films-list__container`);
// const filmsListContainerFirst = filmsListContainerElement[0];
// const filmsListContainerSecond = filmsListContainerElement[1];
// const filmsListContainerThird = filmsListContainerElement[2];
// const filmListElemetn = document.querySelector(`.films-list`);

// renderTemplates(filmsListContainerFirst, films.join(``), `beforeend`);
// renderTemplates(filmsListContainerSecond, films.slice(-1).join(``), `beforeend`, ADDITIONAL_FILMS_LIST_COUNT);
// renderTemplates(filmsListContainerThird, films.slice(0, 1).join(``), `beforeend`, ADDITIONAL_FILMS_LIST_COUNT);
// renderTemplates(filmListElemetn, createShowMoreBtnTemplate(), `beforeend`);
// renderTemplates(bodyElement, createFilmDetailsTemplate(getFilmData()), `beforeend`);

// const filmsListShowMoreBtn = document.querySelector(`.films-list__show-more`);

// filmsListShowMoreBtn.addEventListener(`click`, (evt) => {
//   renderTemplates(filmsListContainerFirst, films.join(``), `beforeend`);
//   filmsListShowMoreBtn.remove();
// });
