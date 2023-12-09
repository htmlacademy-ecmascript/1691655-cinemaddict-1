export const createFilmCard = (film) => {
  const {title, total_rating: totalRating, duration, genre, description, poster} = film.film_info;
  const releaseYear = new Date(film.film_info.release.date).getFullYear();

  return `<article class="film-card">
            <a class="film-card__link">
              <h3 class="film-card__title">${title}</h3>
              <p class="film-card__rating">${totalRating}</p>
              <p class="film-card__info">
                <span class="film-card__year">${releaseYear}</span>
                <span class="film-card__duration">${duration}</span>
                <span class="film-card__genre">${genre[0]}</span>
              </p>
              <img src="${poster}" alt="" class="film-card__poster">
              <p class="film-card__description">${description}</p>
              <span class="film-card__comments">${film.comments.length} comments</span>
            </a>
            <div class="film-card__controls">
              <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
              <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
              <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
            </div>
          </article>`;
};
