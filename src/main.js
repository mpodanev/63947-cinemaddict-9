import {createHeaderSearch} from './components/headerSearchTemplate';
import {createHeaderProfileTemplate} from './components/headerProfileTemplate';
import {createMainNavigationTemplate} from './components/mainNavigationTemplate';
import {createSortTemplate} from './components/sortTemplate';
import {createFilmsTemplate} from './components/filmsTemplate';
// import {createFilmCardTemplate} from './components/filmCardTemplate';
import {createShowMoreBtnTemplate} from './components/showMoreBtnTemplate';
// import {createFilmDetailsTemplate} from './components/filmDetailsTemplate';
import {getFilmData} from './filmData';
import {getFilters} from './filtersData';
import Film from './components/film';
import FilmPopup from './components/filmPopup';
import {Position, render, unrender} from './utils';


const bodyElement = document.querySelector(`body`);
const filmsContainer = document.querySelector(`.films-list__container`);
const additionalFilmsContainer = document.querySelectorAll(`.films-list--extra .films-list__container`);
const MAIN_FILMS_LIST_COUNT = 5;
const ADDITIONAL_FILMS_LIST_COUNT = 2;

const filmMocks = new Array(MAIN_FILMS_LIST_COUNT).fill(``).map(getFilmData);
const filmMocksTopRated = new Array(ADDITIONAL_FILMS_LIST_COUNT).fill(``).map(getFilmData);
const filmMocksMostCommented = new Array(ADDITIONAL_FILMS_LIST_COUNT).fill(``).map(getFilmData);

const renderFilm = (filmMock, container) => {
  const film = new Film(filmMock);
  const filmPopup = new FilmPopup(filmMock);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      // TODO: сделать правильное удаление попапа
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

  // TODO: Убирать возможность закрытия попапа при добавлении коментария
  // filmPopup.getElement().querySelector(`textarea`)
  //   .addEventListener(`focus`, () => {
  //     document.removeEventListener(`keydown`, onEscKeyDown);
  //   });

  // TODO: Возвращать возможность закрытия попапа при прекращении добавления коментария
  // filmPopup.getElement().querySelector(`textarea`)
  //   .addEventListener(`blur`, () => {
  //     document.addEventListener(`keydown`, onEscKeyDown);
  //   });


  render(container, film.getElement(), Position.BEFOREEND);
};

filmMocks.forEach((filmMock) => renderFilm(filmMock, filmsContainer));
filmMocksTopRated.forEach((filmMock) => renderFilm(filmMock, additionalFilmsContainer[0]));
filmMocksTopRated.forEach((filmMock) => renderFilm(filmMock, additionalFilmsContainer[1]));

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
