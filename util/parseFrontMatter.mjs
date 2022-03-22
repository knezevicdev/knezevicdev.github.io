const YAMLFrontMatter = /^---[\s\S]*---/g;

const formatter = {
  published: (val) => val === 'true',
  tags: (val) => val.split(',').map(tag => tag.trim())
}

const parseFrontMatter = (content) => {
  const markdown = content.replace(YAMLFrontMatter, '').trim();
  const [fm] = content.match(YAMLFrontMatter);
  const frontMatter = {};

  fm.replaceAll('---', '')
    .trim()
    .split('\n')
    .map(keyValue => {
      let [key, value] = keyValue.split(':');
      value = value.trim();
      if (formatter[key]) value = formatter[key](value);

      frontMatter[key] = value;
    });

  return {
    markdown,
    frontMatter
  }
}

export default parseFrontMatter;
