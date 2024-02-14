import camelcaseKeys from 'camelcase-keys';
import { UpdateType } from '../consts';
import Observable from '../framework/observable';

export default class FilmsModel extends Observable {
  #films = [];
  #apiService = null;
  #observers = new Set();

  constructor (apiService) {
    super();
    this.#apiService = apiService;
  }

  get films() {
    return this.#films;
  }

  init = async () => {
    try {
      const films = await this.#apiService.films;

      this.#films = films.map(this.#adaptToClient);
    } catch (err) {
      this.#films = [];
    }

    this._notify(UpdateType.INIT);
  };

  updateFilmProperty = async (update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    const updatedFilm = await this.#apiService.updateFilm(update);
    const adaptedFilm = this.#adaptToClient(updatedFilm);

    try {
      this.#films = [
        ...this.#films.slice(0, index),
        adaptedFilm,
        ...this.#films.slice(index + 1)
      ];

      this._notify(UpdateType.MAJOR, adaptedFilm);
    } catch (err) {
      throw new Error('Can\'t update film');
    }
  };

  updateFilmComments = (data) => {
    const currentFilm = data.movie;
    const index = this.#films.findIndex((film) => film.id === currentFilm.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    try {
      this.#films = [
        ...this.#films.slice(0, index),
        currentFilm,
        ...this.#films.slice(index + 1)
      ];

      this._notify(UpdateType.PATCH, data);

    } catch (err) {
      throw new Error('Can\'t update');
    }
  };

  #adaptToClient = (film) => camelcaseKeys(film, {deep: true});
}
