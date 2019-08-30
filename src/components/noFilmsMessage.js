import AbstractComponent from './abstract-component';

export default class NoFilmsMessage extends AbstractComponent {
  getTemplate() {
    return `<div class="no-result">
    There is no movies for your request.
  </div>`;
  }
}
