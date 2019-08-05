import { watch } from 'melanke-watchjs';
import { isURL } from 'validator';
import axios from 'axios';
import parseFeed from './Helpers';

export default () => {
  const state = {
    validationSuccess: false,
    showAlert: false,
    feeds: [],
    posts: [],
  };

  const button = document.querySelector('button[type="submit"]');
  const dismissButton = document.querySelector('button[data-dismiss="alert"]');
  const listOfFeeds = document.querySelector('#listOfFeeds');
  const listOfPosts = document.querySelector('#listOfPosts');
  const input = document.querySelector('input');
  const form = document.querySelector('form');

  watch(state, 'showAlert', () => {
    const alert = document.querySelector('[role=alert]');

    if (state.showAlert && state.validationSuccess) {
      alert.classList.add('show');
    } else {
      alert.classList.remove('show');
    }
  });

  watch(state, 'validationSuccess', () => {
    if (state.validationSuccess) {
      input.classList.remove('is-invalid');
    } else {
      input.classList.add('is-invalid');
    }
    button.disabled = !state.validationSuccess;
  });

  watch(state, 'feeds', () => {
    listOfFeeds.innerHTML = '';
    state.feeds.forEach((f) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.innerHTML = `<h4>${f.title}</h4><p>${f.description}</p>`;
      listOfFeeds.append(li);
    });
  });

  watch(state, 'posts', () => {
    listOfPosts.innerHTML = '';
    state.posts.forEach((p) => {
      const a = document.createElement('a');
      a.setAttribute('href', p.link);
      a.textContent = `${p.title}`;
      const descriptionButton = document.createElement('button');
      descriptionButton.classList.add('btn', 'btn-primary');
      descriptionButton.setAttribute('type', 'button');
      descriptionButton.setAttribute('data-toggle', 'modal');
      descriptionButton.textContent = 'Описание';
      const li = document.createElement('li');
      li.classList.add('list-group-item', 'mt-3', 'd-flex', 'justify-content-between');
      li.append(a);
      li.append(descriptionButton);
      listOfPosts.appendChild(li);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.showAlert = false;
    const currentValue = input.value;

    axios.get(`https://cors-anywhere.herokuapp.com/${currentValue}`)
      .then(resp => parseFeed(resp.data))
      .then((feed) => {
        state.feeds = [{ ...feed, url: currentValue }, ...state.feeds];
        state.posts = [...feed.posts, ...state.posts];
        input.value = '';
      })
      .catch(() => {
        state.showAlert = true;
      });
  });

  input.addEventListener('keyup', ({ target: { value } }) => {
    if (isURL(value) && state.feeds.every(f => f.url !== value)) {
      state.validationSuccess = true;
    } else {
      state.validationSuccess = false;
    }
  });

  dismissButton.addEventListener('click', () => {
    state.showAlert = false;
  });
};
