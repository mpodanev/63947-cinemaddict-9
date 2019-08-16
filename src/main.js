import {createHeaderSearch} from './components/headerSearchTemplate';
import {createHeaderProfileTemplate} from './components/headerProfileTemplate';
import {createMainNavigationTemplate} from './components/mainNavigationTemplate';
import {createSortTemplate} from './components/sortTemplate';
import {createFilmsTemplate} from './components/filmsTemplate';
import {createFilmCardTemplate} from './components/filmCardTemplate';
import {createShowMoreBtnTemplate} from './components/showMoreBtnTemplate';
import {createFilmDetailsTemplate} from './components/filmDetailsTemplate';
import {getTaskData} from './taskData';

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);

const renderTemplates = (container, element, position, quantity = 1) => {
  new Array(quantity).fill(``).forEach(() => container.insertAdjacentHTML(position, element));
};
const MAIN_FILMS_LIST_COUNT = 5;
const ADDITIONAL_FILMS_LIST_COUNT = 2;

renderTemplates(headerElement, createHeaderSearch(), `beforeend`);
renderTemplates(headerElement, createHeaderProfileTemplate(), `beforeend`);
renderTemplates(mainElement, createMainNavigationTemplate(), `beforeend`);
renderTemplates(mainElement, createSortTemplate(), `beforeend`);
renderTemplates(mainElement, createFilmsTemplate(), `beforeend`);

const filmsListContainerElement = document.querySelectorAll(`.films-list__container`);
const filmsListContainerFirst = filmsListContainerElement[0];
const filmsListContainerSecond = filmsListContainerElement[1];
const filmsListContainerThird = filmsListContainerElement[2];
const filmListElemetn = document.querySelector(`.films-list`);
console.log(getTaskData());

renderTemplates(filmsListContainerFirst, createFilmCardTemplate(getTaskData()), `beforeend`, MAIN_FILMS_LIST_COUNT);
renderTemplates(filmsListContainerSecond, createFilmCardTemplate(getTaskData()), `beforeend`, ADDITIONAL_FILMS_LIST_COUNT);
renderTemplates(filmsListContainerThird, createFilmCardTemplate(getTaskData()), `beforeend`, ADDITIONAL_FILMS_LIST_COUNT);
renderTemplates(filmListElemetn, createShowMoreBtnTemplate(), `beforeend`);
// renderTemplates(bodyElement, createFilmDetailsTemplate(), `beforeend`);
