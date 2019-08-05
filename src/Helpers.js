const parseItem = item => [...item.children]
  .reduce((acc, c) => ({ ...acc, [c.tagName]: c.textContent.trim() }), {});

const parseFeed = (xml) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  console.log(xml);
  const titleNode = doc.querySelector('channel>title');
  const descriptionNode = doc.querySelector('channel>description');
  const items = doc.querySelectorAll('item');
  const posts = [...items]
    .filter((item, index) => index < 10)
    .map(item => parseItem(item));
  return { title: titleNode.textContent, description: descriptionNode ? descriptionNode.textContent : '', posts };
};

export default parseFeed;

// rss-channels:
//   https://www.liga.net/tech/technology/rss.xml
//   http://lenta.ru/rss/news
//   http://www.sports.ru/sports_docs.xml
