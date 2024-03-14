import { AUTHORIZATION, END_POINT } from './consts';
import CommentsModel from './model/comments-model';
import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model';
import BoardPresenter from './presenter/board-presenter';
import HeaderPresenter from './presenter/header-presenter';
import FilmsApiService from './services/films-api-service';

const mainContainer = document.querySelector('.main');
const headerContainer = document.querySelector('.header');

const apiService = new FilmsApiService(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel(apiService);
const filterModel = new FilterModel();
const commentsModel = new CommentsModel(apiService);

const navigation = new HeaderPresenter(headerContainer);

const boardPresenter = new BoardPresenter(
  mainContainer,
  filmsModel,
  filterModel,
  commentsModel,
);

boardPresenter.init();
navigation.init();

filmsModel.init();
