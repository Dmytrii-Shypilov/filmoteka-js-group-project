import fetchAPI from './fetch';
import Markup from './markup';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import * as TUI from './pagination';
import scroll from './upBtn';
import { refs } from './refs';
import { Notify } from 'notiflix';

async function onLoadPage(page) {
  try {
    const res = await Promise.all([fetchAPI.fetchTrendingMovies(page), fetchAPI.fetchGenres()]);
    Markup.fetchMovies(res[0].data.results, res[1].data.genres);

    const paginationOnTrending = new Pagination(
      'pagination',
      TUI.getOptions(res[0].data.total_pages),
    );
    paginationOnTrending.on('afterMove', event => {
      scroll();
      TUI.onPaginationTrending(event);
    });
  } catch (error) {
    console.log(error);
    Notify.info('Please enter something');
    refs.pagination.style.display = 'none';
  }
}

onLoadPage(1);
