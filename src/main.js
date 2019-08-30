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
import PageController from './controllers/page-controller';


const mainElement = document.querySelector(`main`);
const filmsContainer = document.querySelector(`.films-list__container`);
const additionalFilmsContainer = document.querySelectorAll(`.films-list--extra .films-list__container`);
const MAIN_FILMS_LIST_COUNT = 5;
const ADDITIONAL_FILMS_LIST_COUNT = 2;

const filmMocks = new Array(MAIN_FILMS_LIST_COUNT).fill(``).map(getFilmData);
const filmMocksAdditional = new Array(ADDITIONAL_FILMS_LIST_COUNT).fill(``).map(getFilmData);

const pageController = new PageController(mainElement, filmMocks);
pageController.init();

// filmMocks.forEach((filmMock) => renderFilm(filmMock, filmsContainer));
// filmMocksAdditional.forEach((filmMock) => renderFilm(filmMock, additionalFilmsContainer[0]));
// filmMocksAdditional.forEach((filmMock) => renderFilm(filmMock, additionalFilmsContainer[1]));
