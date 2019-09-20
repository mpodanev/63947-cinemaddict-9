import AbstractComponent from './abstract-component';

export default class UserRating extends AbstractComponent {
  constructor({title, image, userRating}) {
    super();
    this._title = title;
    this._image = image;
    this._userRating = userRating;
  }

  getTemplate() {
    return `<div class="form-details__middle-container">
    <section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <button class="film-details__watched-reset" type="button">Undo</button>
      </div>

      <div class="film-details__user-score">
        <div class="film-details__user-rating-poster">
          <img src="${this._image}" alt="film-poster" class="film-details__user-rating-img">
        </div>

        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">${this._title}</h3>

          <p class="film-details__user-rating-feelings">How you feel it?</p>

          <div class="film-details__user-rating-score">
            ${this._getRatingsInput()}

          </div>
        </section>
      </div>
    </section>
  </div>`;
  }

  _getRatingsInput() {
    const ratings = [];
    for (let i = 1; i < 10; i++) {
      ratings.push(`<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${i}" id="rating-${i}" ${+this._userRating === i ? `checked` : ``}>
      <label class="film-details__user-rating-label" for="rating-${i}">${i}</label>`);
    }
    return ratings.join(``);
  }
}
