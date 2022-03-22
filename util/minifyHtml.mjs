const minifyHtml = (html) => {
  return html.replace(/\<\!--\s*?[^\s?\[][\s\S]*?--\>/g, '')
    .replace(/\>\s*\</g, '><')
    .replaceAll('\n', '')
    .replace(/  +/g, ' ');
}

export default minifyHtml;
