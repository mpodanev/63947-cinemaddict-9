import Film from '../components/film';
import FilmPopup from '../components/filmPopup';
import {render, unrender, Position, createElement} from '../utils';
import NoFilmsMessage from '../components/noFilmsMessage';
import UserRating from '../components/user-rating';
import moment from 'moment';

export default class MovieController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._noFilmsMessage = new NoFilmsMessage();
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._filmView = new Film(data);
    this._filmPopupView = new FilmPopup(data);
    this._newComments = [];
    this._userRating = new UserRating(data);

    this.init();
  }

  init() {
    render(this._container, this._noFilmsMessage.getElement(), Position.AFTERBEGIN);

    const onEntKeyDown = (evt) => {
      if ((evt.ctrlKey || evt.metaKey) && evt.keyCode === 13) {
        if (this._filmPopupView.getElement().querySelector(`.film-details__add-emoji-label`).firstChild) {

          const commentData = {
            emoji: this._filmPopupView.getElement().querySelector(`.film-details__add-emoji-label`).firstChild.src.match(/emoji\/(\w+)\.png/)[1],
            author: `Some Author`,
            date: Date.now(),
            comment: this._filmPopupView.getElement().querySelector(`.film-details__comment-input`).value
          };
          this._newComments.push(commentData);

          this._filmPopupView.getElement().querySelector(`.film-details__comments-list`)
            .append(createElement(`<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${commentData.emoji}.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${commentData.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${commentData.author}</span>
                <span class="film-details__comment-day">${moment(commentData.data).fromNow()}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`));
          this._filmPopupView.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
          this._filmPopupView.getElement().querySelector(`.film-details__comment-input`).value = ``;
        }
      }
    };

    this._filmView.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, () => {

        render(document.querySelector(`body`), this._filmPopupView.getElement(), Position.BEFOREEND);
        document.addEventListener(`keydown`, this._onEscKeyDown.bind(this));

        if (this._data.isWatched) {
          this._renderUserRating();
        }
        if (this._data.userRating) {
          const ratingTemplate = `<p class="film-details__user-rating">Your rate ${this._data.userRating}</p>`;
          this._filmPopupView.getElement().querySelector(`.film-details__rating`)
              .append(createElement(ratingTemplate));
        }

        this._filmPopupView.getElement().querySelector(`.film-details__close-btn`)
          .addEventListener(`click`, this._closeFilmPopup.bind(this));

        this._filmPopupView.getElement().querySelector(`.film-details__comment-input`)
          .addEventListener(`focus`, () => {
            document.removeEventListener(`keydown`, this._onEscKeyDown.bind(this));
          });

        this._filmPopupView.getElement().querySelector(`.film-details__comment-input`)
          .addEventListener(`keydown`, onEntKeyDown);

        this._filmPopupView.getElement().querySelector(`.film-details__comment-input`)
          .addEventListener(`blur`, () => {
            document.addEventListener(`keydown`, this._onEscKeyDown.bind(this));
          });

        this._filmPopupView.getElement().querySelector(`.film-details__emoji-list`)
          .addEventListener(`click`, (evt) => {
            if (evt.target.tagName === `IMG`) {
              const emoji = evt.target.src.match(/emoji\/(\w+)\.png/)[1];
              this._filmPopupView.getElement().querySelector(`.film-details__add-emoji-label`)
                .innerHTML = `<img src="./images/emoji/${emoji}.png" alt="emoji" width="55" height="55">`;
            }
          });

        this._filmPopupView.getElement().querySelector(`.film-details__control-label--watched`)
          .addEventListener(`click`, this._onWatchedBtnClick.bind(this));
      });

    this._filmView.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, (evt) => this._onConrtollBtnClick(evt));

    this._filmView.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, (evt) => this._onConrtollBtnClick(evt));

    this._filmView.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, (evt) => this._onConrtollBtnClick(evt));

    if (this._noFilmsMessage._element) {
      unrender(this._noFilmsMessage.getElement());
      this._noFilmsMessage.removeElement();
    }
    render(this._container, this._filmView.getElement(), Position.BEFOREEND);
  }

  _onConrtollBtnClick(evt) {
    evt.preventDefault();
    const isActive = evt.target.classList.contains(`film-card__controls-item--active`);
    const newData = Object.assign({}, this._data);

    switch (evt.target.dataset.controll) {
      case `AddToWatchlist`:
        newData.isAddedToWachlist = !isActive;
        break;
      case `Watched`:
        newData.isWatched = !isActive;
        break;
      case `Favorite`:
        newData.isFavorite = !isActive;
        break;
    }
    this._onDataChange(newData, this._data);
  }

  _onWatchedBtnClick() {
    const isActive = !this._filmPopupView.getElement().querySelector(`#watched`).checked;
    if (isActive) {
      this._renderUserRating();
    } else {
      unrender(this._userRating.getElement());
    }
  }

  _renderUserRating() {
    this._filmPopupView.getElement().querySelector(`.form-details__top-container`).after(this._userRating.getElement());

    this._filmPopupView.getElement().querySelector(`.film-details__user-rating-score`)
      .addEventListener(`click`, (evt) => {
        if (evt.target.tagName === `LABEL`) {
          const ratingTemplate = `<p class="film-details__user-rating">Your rate ${evt.target.innerText}</p>`;
          if (this._filmPopupView.getElement().querySelector(`.film-details__user-rating`)) {
            this._filmPopupView.getElement().querySelector(`.film-details__user-rating`).remove();
            this._filmPopupView.getElement().querySelector(`.film-details__rating`)
              .append(createElement(ratingTemplate));
          } else {
            this._filmPopupView.getElement().querySelector(`.film-details__rating`)
              .append(createElement(ratingTemplate));
          }
        }
      });

    this._filmPopupView.getElement().querySelector(`.film-details__watched-reset`)
      .addEventListener(`click`, () => {
        this._filmPopupView.getElement().querySelectorAll(`.film-details__user-rating-input`).forEach((it) => {
          it.checked = false;
        });
        this._filmPopupView.getElement().querySelector(`.film-details__user-rating`).remove();
      });
  }

  _closeFilmPopup() {
    const formData = new FormData(this._filmPopupView.getElement().querySelector(`.film-details__inner`));
    const newData = Object.assign({}, this._data);
    newData.isFavorite = formData.get(`favorite`) ? true : false;
    newData.isWatched = formData.get(`watched`) ? true : false;
    newData.isAddedToWachlist = formData.get(`watchlist`) ? true : false;
    newData.comments.push(...this._newComments);
    this._newComments = [];

    if (newData.isWatched) {
      const ratingInputs = this._filmPopupView.getElement().querySelectorAll(`.film-details__user-rating-input`);
      for (let item of ratingInputs) {
        if (item.checked) {
          newData.userRating = item.value;
        }
      }
    }

    this._onDataChange(newData, this._data);

    unrender(this._filmPopupView.getElement());
    this._filmPopupView.removeElement();
    document.removeEventListener(`keydown`, this._onEscKeyDown.bind(this));
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._closeFilmPopup();
    }
  }
}
