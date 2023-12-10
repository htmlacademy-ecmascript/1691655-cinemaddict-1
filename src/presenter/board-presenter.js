import { FilmCardsOnPage, FilterType, SortType } from '../consts';
import { remove, render } from '../framework/render';
import SiteFilmCardView from '../view/site-film-card/site-film-card-view';
import SiteFilmListContainerView from '../view/site-film-list-container/site-film-list-container-view';
import SiteFilmsListView from '../view/site-film-list/site-films-list-view';
import SiteFilmPopupView from '../view/site-film-popup/site-film-popup-view';
import SiteFilmsContainerView from '../view/site-films-container/site-films-container-view';
import SiteFiltersView from '../view/site-filters/site-filters-view';
import SiteSortView from '../view/site-sort/site-sort-view';

export default class BoardPresenter {

  #filmsContainerComponent = new SiteFilmsContainerView();
  #allFilmsContainer = new SiteFilmsListView();
  #filmListContainerComponent = new SiteFilmListContainerView();

  constructor(boardContainer, filmsModel) {
    this.boardContainer = boardContainer;
    this.filmsModel = filmsModel;
  }

  init () {
    this.boardFilms = [...this.filmsModel.films];

    render(new SiteFiltersView(FilterType.ALL), this.boardContainer);
    render(new SiteSortView(SortType.DEFAULT), this.boardContainer);
    render(this.#filmsContainerComponent, this.boardContainer);

    this.#renderAllFilms();
  }

  #renderAllFilms () {
    render(this.#allFilmsContainer, this.#filmsContainerComponent.element);
    render(this.#filmListContainerComponent, this.#allFilmsContainer.element);
    for (let i = 1; i < FilmCardsOnPage.ALL; i++) {
      this.#renderFilm(this.boardFilms[i]);
    }
  }

  #renderFilm (film) {
    let filmPopup = null;

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        removePopup();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    function removePopup() {
      remove(filmPopup);
    }

    function renderPopup() {
      filmPopup = new SiteFilmPopupView(film);

      render(filmPopup, document.body);
    }

    const filmComponent = new SiteFilmCardView({
      film,
      onFilmCardClick: () => {
        renderPopup();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    render(filmComponent, this.#filmListContainerComponent.element);
  }
}
