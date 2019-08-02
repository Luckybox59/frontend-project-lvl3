import axios from 'axios';

export const parse = (xml) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const channelTitle = doc.querySelector('channel>title')
  const channelDescription = doc.querySelector('channel>description');
  const items = doc.querySelectorAll('item');

  console.log(items);
  return { title: channelTitle.textContent, description: channelDescription.textContent };
  // return obj;
};

const parseXML = (url) => {
  const parser = new DOMParser();
  axios.get(url)
    .then(resp => parser.parseFromString(resp.data, 'text/xml'))
    .then(doc => console.log(doc));
};
