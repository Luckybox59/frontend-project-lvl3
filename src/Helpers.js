const parseItem = item => [...item.children]
  .reduce((acc, c) => ({ ...acc, [c.tagName]: c.textContent.trim() }), {});

const parseFeed = (xml) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  console.log(xml);
  const channelTitle = doc.querySelector('channel>title')
  const channelDescription = doc.querySelector('channel>description');
  const items = doc.querySelectorAll('item');
  const posts = [...items]
    .filter((item, index) => index < 10)
    .map(item => parseItem(item));
  return { title: channelTitle.textContent, description: channelDescription.textContent, posts };
};

export { parseFeed };
