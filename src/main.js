import {createHeaderSearch} from './components/headerSearchTemplate';
import {createHeaderProfileTemplate} from './components/headerProfileTemplate';
import {createMainNavigationTemplate} from './components/mainNavigationTemplate';
import {createSortTemplate} from './components/sortTemplate';
import {createFilmsTemplate} from './components/filmsTemplate';
import {createFilmCardTemplate} from './components/filmCardTemplate';
import {createShowMoreBtnTemplate} from './components/showMoreBtnTemplate';
import {createFilmDetailsTemplate} from './components/filmDetailsTemplate';
import {getTaskData} from './taskData';
import {getFilters} from './filtersData';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);

const renderTemplates = (container, element, position, quantity = 1) => {
  new Array(quantity).fill(``).forEach(() => container.insertAdjacentHTML(position, element));
};
const MAIN_FILMS_LIST_COUNT = 5;
const ADDITIONAL_FILMS_LIST_COUNT = 2;
const films = new Array(MAIN_FILMS_LIST_COUNT)
  .fill(``)
  .map(getTaskData)
  .map(createFilmCardTemplate);

renderTemplates(headerElement, createHeaderSearch(), `beforeend`);
renderTemplates(headerElement, createHeaderProfileTemplate(), `beforeend`);
renderTemplates(mainElement, createMainNavigationTemplate(getFilters()), `beforeend`);
renderTemplates(mainElement, createSortTemplate(), `beforeend`);
renderTemplates(mainElement, createFilmsTemplate(), `beforeend`);

const filmsListContainerElement = document.querySelectorAll(`.films-list__container`);
const filmsListContainerFirst = filmsListContainerElement[0];
const filmsListContainerSecond = filmsListContainerElement[1];
const filmsListContainerThird = filmsListContainerElement[2];
const filmListElemetn = document.querySelector(`.films-list`);

renderTemplates(filmsListContainerFirst, films.join(``), `beforeend`);
renderTemplates(filmsListContainerSecond, films.slice(-1).join(``), `beforeend`, ADDITIONAL_FILMS_LIST_COUNT);
renderTemplates(filmsListContainerThird, films.slice(0, 1).join(``), `beforeend`, ADDITIONAL_FILMS_LIST_COUNT);
renderTemplates(filmListElemetn, createShowMoreBtnTemplate(), `beforeend`);
renderTemplates(bodyElement, createFilmDetailsTemplate(getTaskData()), `beforeend`);

const filmsListShowMoreBtn = document.querySelector(`.films-list__show-more`);

filmsListShowMoreBtn.addEventListener(`click`, (evt) => {
  renderTemplates(filmsListContainerFirst, films.join(``), `beforeend`);
  filmsListShowMoreBtn.remove();
});
