import Observable from '../framework/observable';
import camelcaseKeys from 'camelcase-keys';

export default class CommentsModel extends Observable {
  #comments = null;
  #filmId = null;
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  init = async (filmId) => {
    try {
      this.#comments = await this.#apiService.getComments(filmId);
    } catch(err) {
      this.#comments = [];
    }
  };

  get comments() {
    return this.#comments;
  }

  updateComment = async (update) => {
    const updatedFilm = await this.#apiService.updateComment(update);

    return this.#adaptToClient(updatedFilm);
  };

  #adaptToClient = (film) => camelcaseKeys(film, {deep: true});
}
