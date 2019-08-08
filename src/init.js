import { watch } from 'melanke-watchjs';
import { isURL } from 'validator';
import axios from 'axios';
import parseFeed from './Helpers';

export default () => {
  const state = {
    validationSuccess: false,
    showModal: false,
    modal: {},
    feeds: [],
    posts: [],
  };

  const button = document.querySelector('button[type="submit"]');
  const dismissButton = document.querySelector('button[data-dismiss="alert"]');
  const listOfFeeds = document.querySelector('#listOfFeeds');
  const listOfPosts = document.querySelector('#listOfPosts');
  const input = document.querySelector('input');
  const form = document.querySelector('form');

  watch(state, 'showModal', () => {
    const descriptionModal = document.querySelector(state.modal.id);

    if (!state.showModal) {
      descriptionModal.classList.remove('show');
      descriptionModal.style.display = 'none';
      return;
    }
    descriptionModal.querySelector('.modal-title').textContent = state.modal.actualContent.title;
    descriptionModal.querySelector('.modal-body').textContent = state.modal.actualContent.description;
    descriptionModal.classList.add('show');
    descriptionModal.style.display = 'block';
    const dismissElems = descriptionModal.querySelectorAll('[data-dismiss="modal"]');
    dismissElems.forEach((el) => {
      el.addEventListener('click', () => {
        state.showModal = false;
      });
    });
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
      descriptionButton.type = 'button';
      descriptionButton.dataset.toggle = 'modal';
      descriptionButton.dataset.id = p.link;
      descriptionButton.dataset.toggle = 'modal';
      descriptionButton.dataset.target = '#descriptionModal';
      descriptionButton.textContent = 'Описание';
      descriptionButton.addEventListener('click', ({ target: { dataset } }) => {
        const { target } = dataset;
        state.modal.id = target;
        state.modal.actualContent = p;
        state.showModal = true;
      });
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
    console.log(state.posts[0]);
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
