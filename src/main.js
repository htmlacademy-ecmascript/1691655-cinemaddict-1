import CommentsModel from './model/comments-model';
import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model';
import BoardPresenter from './presenter/board-presenter';
import FooterPresenter from './presenter/footer-presenter';
import HeaderPresenter from './presenter/header-presenter';
import ApiService from './services/api-service';

const mainContainer = document.querySelector('.main');
const headerContainer = document.querySelector('.header');
const footerContainer = document.querySelector('.footer__statistics');

const apiService = new ApiService();
const filmsModel = new FilmsModel(apiService);
const filterModel = new FilterModel();
const commentsModel = new CommentsModel(apiService);

const navigation = new HeaderPresenter(headerContainer);

const boardPresenter = new BoardPresenter(
  mainContainer,
  filmsModel,
  filterModel,
  apiService,
  commentsModel
);
const footer = new FooterPresenter(footerContainer);

boardPresenter.init();
navigation.init();

filmsModel.init().finally(() => {
  // filterPresenter.init();
  // boardPresenter.init();
});

footer.init();

