import MarkdownIt from 'markdown-it';
import sass from 'node-sass';
import fs from 'fs';
import formatDate from './util/formatDate.mjs';
import copyFiles from './util/copyFiles.mjs';
import minifyHtml from './util/minifyHtml.mjs';
import parseFrontMatter from './util/parseFrontMatter.mjs';

const defaultTitle = 'knezevicdev';
const defaultDescription = 'Software Engineering at its worst.';

const md = new MarkdownIt();

const build = () => {
  fs.rmSync('./build', {recursive: true, force: true});
  fs.mkdirSync('./build');

  const templateHtml = fs.readFileSync('./template.html', 'utf8');
  const posts = [];

  console.log('Building posts...');
  const postsFiles = fs.readdirSync('./posts');
  for (const postFile of postsFiles) {
    const postMd = fs.readFileSync(`./posts/${postFile}`, 'utf8');
    const {markdown, frontMatter} = parseFrontMatter(postMd);
    const postHtml = md.render(markdown);

    if (!frontMatter.published) continue;

    const postSlug = postFile.replace('.md', '');
    const title = `${frontMatter.title} | ${defaultTitle}`;

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
      .replace('{{post-title}}', frontMatter.title)
      .replace('{{date-raw}}', frontMatter.date)
      .replace('{{date}}', formatDate(frontMatter.date))
      .replaceAll('{{description}}', frontMatter.description);

    fs.mkdirSync(`./build/${postSlug}`);
    fs.writeFileSync(`./build/${postSlug}/index.html`, minifyHtml(post));

    posts.push({
      href: `/${postSlug}`,
      title: frontMatter.title,
      date: frontMatter.date,
      description: frontMatter.description
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
      const index = page.replace('{{posts}}', buildPostsList());
      fs.writeFileSync(`./build/index.html`, minifyHtml(index));
      continue;
    }

    fs.mkdirSync(`./build/${pageSlug}`);
    fs.writeFileSync(`./build/${pageSlug}/index.html`, minifyHtml(page));
  }

  console.log('Building styles...');
  const result = sass.renderSync({
    file: './style.scss',
    outputStyle: 'compressed',
    importer: (url, prev, done) => ({
      contents: fs.readFileSync(url, 'utf8')
    })
  });
  fs.writeFileSync('./build/style.css', result.css);

  copyFiles('./fonts', './build');
  copyFiles('./static', './build');

  console.log('Build finished!');
}

build();

export default build;
