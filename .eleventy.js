const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter('htmlDateString', dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat('MMMM d, yyyy')
  });

  eleventyConfig.addPassthroughCopy("src/assets/img");

  let markdownLib = require("markdown-it")({
    html: true
  })
  .use(require("markdown-it-attrs"))
  .use(require('markdown-it-container'), 'section', {
    render: (tokens, idx) => {
      var m = tokens[idx].info.trim().match(/^section\s+(.*)$/);
   
      if (tokens[idx].nesting === 1) {
        // opening tag
        return `<section${m && m[1] ? ' class="' + m[1] + '"' : ''}><content>`;
   
      } else {
        // closing tag
        return '</content></section>\n';
      }
    }
  })
  .use(require('markdown-it-container'), 'split', {
    render: (tokens, idx) => {
      return tokens[idx].nesting === 1 ? '<split>' : '</split>';
    }
  });
  
  eleventyConfig.setLibrary("md", markdownLib);

  return {
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'dist',
    },
  };
};