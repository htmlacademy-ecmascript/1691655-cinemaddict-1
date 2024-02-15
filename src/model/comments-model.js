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
      this.#filmId = filmId;
      this.#comments = await this.#apiService.getComments(this.#filmId);
    } catch(err) {
      this.#comments = [];
    }
  };

  get comments() {
    return this.#comments;
  }

  updateComment = async (update) => {
    const responce = await this.#apiService.updateComment(update);

    return this.#adaptToClient(responce);
  };

  deleteComment = async (commentId) => {
    const responce = await this.#apiService.deleteComment(commentId);

    if (responce.ok) {
      await this.init(this.#filmId);
    }

    return {
      filmId: this.#filmId,
      comments: this.#comments
    };
  };

  #adaptToClient = (film) => camelcaseKeys(film, {deep: true});
}
