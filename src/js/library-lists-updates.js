import { refs } from './refs.js';
import { clickedMovie } from './movieModal.js';
import { Notify } from 'notiflix';
import { renderWatchedList, renderQueueList } from './library-lists.js';

export let watchedList = [];
export let queueList = [];

refs.backdrop.addEventListener('click', addToQueueList);
refs.backdrop.addEventListener('click', addToWatchedList);

getQueueStorageState();
getWatchedStorageState();

function getWatchedStorageState() {
  const stored = localStorage.getItem('watched-list');
  if (stored === null) {
    return (watchedList = []);
  }
  const parsed = JSON.parse(stored);
  watchedList = parsed;
}

function getQueueStorageState() {
  const stored = localStorage.getItem('queue-list');
  if (stored === null) {
    return (queueList = []);
  }
  const parsed = JSON.parse(stored);
  queueList = parsed;
}

function IfMovieisAdded(movieName, listType) {
  const list = localStorage.getItem(listType);

  if (list === null) {
    return false;
  }

  let moviesArray = [];
  const parsedList = JSON.parse(list);

  parsedList.map(el => {
    moviesArray.push(el.name);
  });
  return moviesArray.includes(movieName);
}

function addToWatchedList(event) {
  const btn = event.target;

  if (btn.hasAttribute('data-watched-btn')) {
    const yearReleased = clickedMovie.release_date.slice(0, 4);

    const movie = {
      id: clickedMovie.id,
      name: clickedMovie.title,
      genres: clickedMovie.genre_ids,
      rating: clickedMovie.vote_average,
      year: yearReleased,
      image: clickedMovie.poster_path,
    };

    if (!IfMovieisAdded(clickedMovie.title, 'queue-list')) {
      if (!IfMovieisAdded(clickedMovie.title, 'watched-list')) {
        watchedList.push(movie);
        Notify.success('Movie is added to Watched');
        btn.textContent = 'remove from watched';
        localStorage.setItem('watched-list', JSON.stringify(watchedList));
        renderWatchedList();
        return;
      } else {
        watchedList = watchedList.filter(movie => movie.name !== clickedMovie.title);
        Notify.warning('This movie has been removed from Watched');
        btn.textContent = 'add to watched';
        localStorage.setItem('watched-list', JSON.stringify(watchedList));
        renderWatchedList();
        return;
      }
    } else {
      return Notify.info('This movie is already in Queue');
    }
  }

  return;
}

function addToQueueList(event) {
  const btn = event.target;

  if (btn.hasAttribute('data-queue-btn')) {
    const yearReleased = clickedMovie.release_date.slice(0, 4);

    const movie = {
      id: clickedMovie.id,
      name: clickedMovie.title,
      genres: clickedMovie.genre_ids,
      rating: clickedMovie.vote_average,
      year: yearReleased,
      image: clickedMovie.poster_path,
    };

    if (!IfMovieisAdded(clickedMovie.title, 'watched-list')) {
      if (!IfMovieisAdded(clickedMovie.title, 'queue-list')) {
        queueList.push(movie);
        Notify.success('Movie is added to Queue');
        btn.textContent = 'remove from queue';
        localStorage.setItem('queue-list', JSON.stringify(queueList));
        renderQueueList();
        return;
      } else {
        queueList = queueList.filter(movie => movie.name !== clickedMovie.title);
        Notify.warning('This movie has already been added to Queue');
        btn.textContent = 'add to queue';
        localStorage.setItem('queue-list', JSON.stringify(queueList));
        renderQueueList();
        return;
      }
    } else {
      return Notify.info('This movie is already in Watched');
    }
  }

  return;
}

document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.code === 'KeyZ') {
    localStorage.clear();
    watchedList = [];
    queueList = [];
    refs.libraryGallery.innerHTML = '';
  }
});

export {
  addToWatchedList,
  addToQueueList,
  IfMovieisAdded,
  getWatchedStorageState,
  getQueueStorageState,
};
