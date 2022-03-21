import MarkdownIt from 'markdown-it';
import MarkdownItFrontMatter from 'markdown-it-front-matter';
import rimraf from 'rimraf';
import sass from 'node-sass';
import fs from 'fs';
import formatDate from "./formatDate.mjs";
import copyFiles from "./copyFiles.mjs";

const defaultTitle = 'knezevicdev';
const defaultDescription = 'Software Engineering at its worst.';


const formatter = {
  published: (val) => val === 'true',
  tags: (val) => val.split(',').map(tag => tag.trim())
}

let postMeta = {};

const md = new MarkdownIt();
md.use(MarkdownItFrontMatter, (fm) => {
  postMeta = {};

  fm.split('\n').map(keyValue => {
    let [key, value] = keyValue.split(':');
    value = value.trim();
    if (formatter[key]) value = formatter[key](value);

    postMeta[key] = value;
  });
});

rimraf.sync('./build');
fs.mkdirSync('./build');

const templateHtml = fs.readFileSync('./template.html', 'utf8');
const posts = [];

console.log('Building posts...');
const postsFiles = fs.readdirSync('./posts');
for (const postFile of postsFiles) {
  const postMd = fs.readFileSync(`./posts/${postFile}`, 'utf8');
  const postHtml = md.render(postMd);

  if (!postMeta.published) continue;

  const postSlug = postFile.replace('.md', '');
  const title = `${postMeta.title} | ${defaultTitle}`

  const post = templateHtml
    .replace('{{content}}', `
      <article>
        <h1 class="post-title">{{post-title}}</h1>
        <p class="post-info">
          <span>
            Published on
            <time dateTime="{{date-raw}}" itemProp="datePublished">{{date}}</time>
          </span>
        </p>
        {{content}}
      </article>
    `)
    .replace('{{content}}', postHtml)
    .replaceAll('{{title}}', title)
    .replace('{{post-title}}', postMeta.title)
    .replace('{{date-raw}}', postMeta.date)
    .replace('{{date}}', formatDate(postMeta.date))
    .replaceAll('{{description}}', postMeta.description);

  fs.mkdirSync(`./build/${postSlug}`);
  fs.writeFileSync(`./build/${postSlug}/index.html`, post)

  posts.push({
    href: `/${postSlug}`,
    title: postMeta.title,
    date: postMeta.date,
    description: postMeta.description
  });
}

const buildPostsList = () => {
  return posts.reduce((postsHtml, post) => {
    return postsHtml + `
      <li class="article-item">
        <article>
          <a href="${post.href}">
            ${post.title}
          </a>
          <small><time>${formatDate(post.date)}</time></small>
          <p>${post.description}</p>
         </article>
      </li>
    `;
  }, '');
}

console.log('Building pages...');
const pagesFiles = fs.readdirSync('./pages');
for (const pageFile of pagesFiles) {
  const pageHtml = fs.readFileSync(`./pages/${pageFile}`, 'utf8');
  const pageSlug = pageFile.replace('.html', '');

  const page = templateHtml
    .replace('{{content}}', pageHtml)
    .replaceAll('{{title}}', defaultTitle)
    .replaceAll('{{description}}', defaultDescription);

  if (pageSlug === 'index') {
    fs.writeFileSync(`./build/index.html`, page.replace('{{posts}}', buildPostsList()));
    continue;
  }

  fs.mkdirSync(`./build/${pageSlug}`);
  fs.writeFileSync(`./build/${pageSlug}/index.html`, page)
}

console.log('Building styles...');
const result = sass.renderSync({
  file: './style.scss',
  importer: (url, prev, done) => {
    const contents = fs.readFileSync(url.replace('~', './node_modules/'), 'utf8');

    return {
      contents
    }
  }
});
fs.writeFileSync('./build/style.css', result.css);

copyFiles('./fonts', './build');
copyFiles('./static', './build');

console.log('Build finished!');
