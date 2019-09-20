import {getFilmData} from './filmData';
import PageController from './controllers/page-controller';


const mainElement = document.querySelector(`main`);
const MAIN_FILMS_LIST_COUNT = 5;

const filmMocks = new Array(MAIN_FILMS_LIST_COUNT).fill(``).map(getFilmData);

const pageController = new PageController(mainElement, filmMocks);
pageController.init();
