import { watch } from 'melanke-watchjs';
import { isURL } from 'validator';
import axios from 'axios';
import '@babel/polyfill';
import { parse } from './Helpers';

export default () => {
  const state = {
    validationSuccess: false,
    url: '',
    feeds: [],
    posts: [],
  };

  const button = document.querySelector('button');
  const ul = document.querySelector('ul');
  const input = document.querySelector('input');
  const form = document.querySelector('form');

  watch(state, 'validationSuccess', () => {
    state.validationSuccess
      ? input.classList.remove('is-invalid')
      : input.classList.add('is-invalid');

    button.disabled = !state.validationSuccess;    
  });

  watch(state, 'feeds', () => {
    state.feeds.forEach((f) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.textContent = `${f.title}`;
      ul.appendChild(li);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const feed = parse(xmlStr);
    state.feeds = [...state.feeds, { url: 'xe', title: feed.title, description: feed.description }];
  });

  input.addEventListener('keyup', ({ target: { value } }) => {
    if (isURL(value)) {
      state.url = value;
      state.validationSuccess = true;
    } else {
      state.validationSuccess = false;
    }
  });
};

const xmlStr = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
        <title>
            <![CDATA[Lorem ipsum feed for an interval of 1 minutes]]>
        </title>
        <description>
            <![CDATA[This is a constantly updating lorem ipsum feed]]>
        </description>
        <link>http://example.com/</link>
        <generator>RSS for Node</generator>
        <lastBuildDate>Mon, 29 Jul 2019 14:50:24 GMT</lastBuildDate>
        <pubDate>Mon, 29 Jul 2019 14:50:00 GMT</pubDate>
        <copyright>
            <![CDATA[Michael Bertolacci, licensed under a Creative Commons Attribution 3.0 Unported License.]]>
        </copyright>
        <ttl>1</ttl>
        <item>
            <title>
                <![CDATA[Lorem ipsum 2019-07-29T14:50:00Z]]>
            </title>
            <description>
                <![CDATA[Eiusmod elit proident consectetur fugiat esse irure laborum nostrud proident sunt.]]>
            </description>
            <link>http://example.com/test/1564411800</link>
            <guid isPermaLink="true">http://example.com/test/1564411800</guid>
            <dc:creator>
                <![CDATA[John Smith]]>
            </dc:creator>
            <pubDate>Mon, 29 Jul 2019 14:50:00 GMT</pubDate>
        </item>
        <item>
            <title>
                <![CDATA[Lorem ipsum 2019-07-29T14:49:00Z]]>
            </title>
            <description>
                <![CDATA[Cupidatat dolore et esse id incididunt officia duis non aliqua reprehenderit mollit.]]>
            </description>
            <link>http://example.com/test/1564411740</link>
            <guid isPermaLink="true">http://example.com/test/1564411740</guid>
            <dc:creator>
                <![CDATA[John Smith]]>
            </dc:creator>
            <pubDate>Mon, 29 Jul 2019 14:49:00 GMT</pubDate>
        </item>
        <item>
            <title>
                <![CDATA[Lorem ipsum 2019-07-29T14:48:00Z]]>
            </title>
            <description>
                <![CDATA[Occaecat duis dolor culpa elit proident dolor reprehenderit nostrud irure.]]>
            </description>
            <link>http://example.com/test/1564411680</link>
            <guid isPermaLink="true">http://example.com/test/1564411680</guid>
            <dc:creator>
                <![CDATA[John Smith]]>
            </dc:creator>
            <pubDate>Mon, 29 Jul 2019 14:48:00 GMT</pubDate>
        </item>
        <item>
            <title>
                <![CDATA[Lorem ipsum 2019-07-29T14:47:00Z]]>
            </title>
            <description>
                <![CDATA[Nostrud cupidatat fugiat aliqua sit velit occaecat incididunt magna sunt.]]>
            </description>
            <link>http://example.com/test/1564411620</link>
            <guid isPermaLink="true">http://example.com/test/1564411620</guid>
            <dc:creator>
                <![CDATA[John Smith]]>
            </dc:creator>
            <pubDate>Mon, 29 Jul 2019 14:47:00 GMT</pubDate>
        </item>
        <item>
            <title>
                <![CDATA[Lorem ipsum 2019-07-29T14:46:00Z]]>
            </title>
            <description>
                <![CDATA[Ad non qui occaecat exercitation aliqua aliquip proident est aliquip amet.]]>
            </description>
            <link>http://example.com/test/1564411560</link>
            <guid isPermaLink="true">http://example.com/test/1564411560</guid>
            <dc:creator>
                <![CDATA[John Smith]]>
            </dc:creator>
            <pubDate>Mon, 29 Jul 2019 14:46:00 GMT</pubDate>
        </item>
        <item>
            <title>
                <![CDATA[Lorem ipsum 2019-07-29T14:45:00Z]]>
            </title>
            <description>
                <![CDATA[Tempor elit Lorem duis labore quis esse.]]>
            </description>
            <link>http://example.com/test/1564411500</link>
            <guid isPermaLink="true">http://example.com/test/1564411500</guid>
            <dc:creator>
                <![CDATA[John Smith]]>
            </dc:creator>
            <pubDate>Mon, 29 Jul 2019 14:45:00 GMT</pubDate>
        </item>
        <item>
            <title>
                <![CDATA[Lorem ipsum 2019-07-29T14:44:00Z]]>
            </title>
            <description>
                <![CDATA[Ut culpa ad ullamco ut Lorem sint proident.]]>
            </description>
            <link>http://example.com/test/1564411440</link>
            <guid isPermaLink="true">http://example.com/test/1564411440</guid>
            <dc:creator>
                <![CDATA[John Smith]]>
            </dc:creator>
            <pubDate>Mon, 29 Jul 2019 14:44:00 GMT</pubDate>
        </item>
        <item>
            <title>
                <![CDATA[Lorem ipsum 2019-07-29T14:43:00Z]]>
            </title>
            <description>
                <![CDATA[Magna officia elit aliquip excepteur sint ullamco reprehenderit non aute.]]>
            </description>
            <link>http://example.com/test/1564411380</link>
            <guid isPermaLink="true">http://example.com/test/1564411380</guid>
            <dc:creator>
                <![CDATA[John Smith]]>
            </dc:creator>
            <pubDate>Mon, 29 Jul 2019 14:43:00 GMT</pubDate>
        </item>
        <item>
            <title>
                <![CDATA[Lorem ipsum 2019-07-29T14:42:00Z]]>
            </title>
            <description>
                <![CDATA[Lorem amet deserunt culpa qui proident consectetur.]]>
            </description>
            <link>http://example.com/test/1564411320</link>
            <guid isPermaLink="true">http://example.com/test/1564411320</guid>
            <dc:creator>
                <![CDATA[John Smith]]>
            </dc:creator>
            <pubDate>Mon, 29 Jul 2019 14:42:00 GMT</pubDate>
        </item>
        <item>
            <title>
                <![CDATA[Lorem ipsum 2019-07-29T14:41:00Z]]>
            </title>
            <description>
                <![CDATA[Aliquip ullamco occaecat labore quis fugiat in velit sunt cupidatat qui.]]>
            </description>
            <link>http://example.com/test/1564411260</link>
            <guid isPermaLink="true">http://example.com/test/1564411260</guid>
            <dc:creator>
                <![CDATA[John Smith]]>
            </dc:creator>
            <pubDate>Mon, 29 Jul 2019 14:41:00 GMT</pubDate>
        </item>
    </channel>
</rss>`;